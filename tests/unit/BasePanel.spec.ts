import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import BasePanel from "@/components/panel/BasePanel.vue";
import PanelBlock from "@/components/panel/PanelBlock.vue";
import PanelTabs from "@/components/panel/PanelTabs.vue";
import PanelTab from "@/components/panel/PanelTab.vue";
import PanelBlockContent from "@/components/panel/PanelBlockContent.vue";
import { BulmaColor } from "@/types/bulma-color";
import { getFirstEmission } from "./util";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);

const firstTitle = "First";
const secondTitle = "Second";
const thirdTitle = "Third";
const firstTabTitle = "First Tab";
const secondTabTitle = "Second Tab";

// HACK: Had to copy-paste it here because of https://github.com/vuejs/vue-cli/issues/6924
type BasePanelProps = {
  headingText?: string;
  activeItemId?: string;
  activeTabId?: string;
  color?: BulmaColor;
};

interface WrapperVariant {
  defaultSlot: string;
}

const basicWrapper = {
  defaultSlot: `
      <panel-block titleText="${firstTitle}" />
      <panel-block titleText="${secondTitle}" />
      <panel-block titleText="${thirdTitle}" icon="heart"/>
      `,
};

const tabbedWrapper = {
  defaultSlot: `
    <panel-tabs>
      <panel-tab titleText="${firstTabTitle}">
        <panel-block titleText="${firstTitle}" />
        <panel-block titleText="${secondTitle}" />
      </panel-tab>
      <panel-tab titleText="${secondTabTitle}">
        <panel-block titleText="${thirdTitle}" />
      </panel-tab>
    </panel-tabs>
  `,
};

function buildWrapper(props: BasePanelProps = {}, variant: WrapperVariant = basicWrapper): VueWrapper {
  return mount(BasePanel, {
    props,
    global: {
      components: { PanelBlock, PanelTabs, PanelBlockContent, PanelTab, FontAwesomeIcon },
    },
    slots: {
      default: variant.defaultSlot,
    }
  });
}

function findItemByText(wrapper: VueWrapper, text: string): DOMWrapper<Element> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapper.findAll(".panel-block").find(block => block.text() === text)!;
}

function findTabByText(wrapper: VueWrapper, text: string): DOMWrapper<Element> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapper.findAll(".panel-tabs a").find(tab => tab.text() === text)!;
}

describe("BasePanel.vue", () => {
  test("the heading text apears in the heading", () => {
    const headingText = "testheading";
    const wrapper = buildWrapper({ headingText });
    
    expect(wrapper.get(".panel-heading").text()).toBe(headingText);
  });

  test("the active item is active", () => {
    const activeItemId = firstTitle;
    const wrapper = buildWrapper({ activeItemId });

    expect(findItemByText(wrapper, activeItemId).element.classList).toContain("is-active");
  });

  test("the icon appears", () => {
    const wrapper = buildWrapper();

    // The third item has the icon
    expect(findItemByText(wrapper, thirdTitle).getComponent(FontAwesomeIcon).props().icon).toBe("heart");
  });

  test("color is added", () => {
    const color = "info";
    const wrapper = buildWrapper({ color });

    expect(wrapper.element.classList).toContain(`is-${color}`);
  });

  test("clicking on an item marks it as active", async () => {
    const wrapper = buildWrapper();
    const targetItem = findItemByText(wrapper, firstTitle);

    // Sanity check, initially the item is not marked as active
    expect(targetItem.element.classList).not.toContain("is-active");

    await targetItem.trigger("click");

    expect(targetItem.element.classList).toContain("is-active");
  });

  test("clicking on an item emits an event to set it as active", async () => {
    const wrapper = buildWrapper();
    const targetItem = findItemByText(wrapper, firstTitle);

    // Sanity check, initially the item is not marked as active
    expect(targetItem.element.classList).not.toContain("is-active");

    await targetItem.trigger("click");

    expect(getFirstEmission(wrapper, "update:activeItemId")).toBe(firstTitle);
  });

  test("all tabs appear as panel-tabs", () => {
    const wrapper = buildWrapper({}, tabbedWrapper);

    expect(findTabByText(wrapper, firstTabTitle).exists()).toBeTrue();
    expect(findTabByText(wrapper, secondTabTitle).exists()).toBeTrue();
  });

  test("only the active tab is active", () => {
    const activeTabId = firstTabTitle;
    const wrapper = buildWrapper({ activeTabId }, tabbedWrapper);

    expect(wrapper.findAll(".panel-tabs .is-active").length).toBe(1);
    expect(findTabByText(wrapper, activeTabId).element.classList).toContain("is-active");
  });

  test("only the active tab's contents are shown", () => {
    const wrapper = buildWrapper({ activeTabId: secondTabTitle }, tabbedWrapper);

    // The first and second elements belong to the first tab, the third belongs
    // to the second tab
    expect(findItemByText(wrapper, firstTitle)).toBeUndefined()
    expect(findItemByText(wrapper, secondTitle)).toBeUndefined();
    expect(findItemByText(wrapper, thirdTitle).exists()).toBeTrue();
  });

  test("clicking on a tab sets it as active", async () => {
    const wrapper = buildWrapper({}, tabbedWrapper);
    const targetTab = findTabByText(wrapper, firstTabTitle);
    
    // Sanity check, the tab is initially not active
    expect(targetTab.element.classList).not.toContain("is-active");

    await targetTab.trigger("click");

    expect(targetTab.element.classList).toContain("is-active");
  });

  test("clicking on a tab emits an event to set it as active", async () => {
    const wrapper = buildWrapper({}, tabbedWrapper);
    const targetTab = findTabByText(wrapper, firstTabTitle);

    await targetTab.trigger("click");

    expect(getFirstEmission(wrapper, "update:activeTabId")).toBe(firstTabTitle);
  });
});
