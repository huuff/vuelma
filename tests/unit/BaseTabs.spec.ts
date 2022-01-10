import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import BaseTabs from "@/components/tabs/BaseTabs.vue";
import BaseTab from "@/components/tabs/BaseTab.vue";
import { getFirstEmission } from "./util";

const firstTabTitle = "FirstTitle";
const secondTabTitle = "SecondTitle";
const thirdTabTitle = "ThirdTitle";

const firstTabContents = "<p>First tab</p>";
const secondTabContents = "<div>Second tab</div>";
const thirdTabContents = "<span>Third tab</span>";

const defaultSlot = `
          <base-tab titleText="${firstTabTitle}">
              ${firstTabContents}
          </base-tab>
          <base-tab titleText="${secondTabTitle}">
              ${secondTabContents}
          </base-tab>
          <base-tab titleText="${thirdTabTitle}">
              ${thirdTabContents}
          </base-tab>
        `;

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildWrapper(props: Record<string, any> = {}): VueWrapper {
  return mount(BaseTabs, {
    props,
    global: { components: {BaseTab} },
    slots: { default: defaultSlot },
  });
}

function findTabByText(wrapper: VueWrapper, text: string): DOMWrapper<Element> {
  for (const tab of wrapper.findAll(".tabs li")) {
    if (tab.text() === text) {
      return tab;
    }
  }

  throw new Error(`Tab with text ${text} not found`);
}

function isActiveByText(wrapper: VueWrapper, text: string): boolean {
  return findTabByText(wrapper, text).element.classList.contains("is-active");
}

describe("BaseTabs.vue", () => {
  test("there is the same number of tab elements as tabs", () => {
    const wrapper = buildWrapper();

    expect(wrapper.findAll("li").length).toBe(3);
  });

  test("only the active tab has the is-active class", () => {
    const wrapper = buildWrapper({ activeTabId: firstTabTitle });

    expect(isActiveByText(wrapper, firstTabTitle)).toBeTrue();
    expect(isActiveByText(wrapper, secondTabTitle)).toBeFalse();
    expect(isActiveByText(wrapper, thirdTabTitle)).toBeFalse();
  });

  test("only the contents of the active tab are visible", () => {
    const wrapper = buildWrapper({ activeTabId: firstTabTitle });

    expect(wrapper.html()).toContain(firstTabContents);
    expect(wrapper.html()).not.toContain(secondTabContents);
    expect(wrapper.html()).not.toContain(thirdTabContents);
  });

  test("when clicking on a different tab, it's set as active", async () => {
    const wrapper = buildWrapper();

    // Sanity checking that no tab is active initially
    expect(wrapper.findAll(".is-active")).toBeEmpty();

    await (findTabByText(wrapper, secondTabTitle).get("a")).trigger("click");

    expect(isActiveByText(wrapper, secondTabTitle)).toBeTrue();
    expect(wrapper.html()).toContain(secondTabContents);
  });

  test("when clicking on a different tab, it emits an event to set it as active", async () => {
    const wrapper = buildWrapper({ activeTabId: firstTabTitle });

    await (findTabByText(wrapper, secondTabTitle).get("a")).trigger("click");

    expect(getFirstEmission(wrapper, "update:activeTabId")).toBe(secondTabTitle);
  });
});
