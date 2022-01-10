import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import DropdownItem from "@/components/dropdown/DropdownItem.vue";
import DropdownDivider from "@/components/dropdown/DropdownDivider.vue";
import { getFirstEmission } from "../util";

function buildWrapper(
  defaultSlot: string,
  props: { triggerText?: string; open?: boolean } = {},
) {
  return mount(BaseDropdown, {
    props: { 
      triggerText: "Click",
      ...props,
    },
    global: {
      components: { DropdownItem, DropdownDivider },
      stubs: [ "font-awesome-icon" ],
    },
    slots: {
      default: defaultSlot,
    },
    attachTo: document.documentElement,
  });
}

async function clickTrigger(wrapper: VueWrapper) {
  await wrapper.find(".dropdown-trigger button").trigger("click");
}

function findItemByText(wrapper: VueWrapper, text: string): DOMWrapper<Element> {
  //eslint-disable-next-line
  return wrapper.findAll(".dropdown-item").find(item => item.text() === text)!;
}

beforeEach(() => {
  jest.useFakeTimers("modern");
});

afterAll(() => {
  jest.useRealTimers();
});

const firstTestItem = "testitem1";
const secondTestItem = "testitem2";

describe("BaseDropdown.vue", () => {
  test("it has the trigger text", () => {
    const triggerText = "testtext";
    const wrapper = buildWrapper("", { triggerText });

    expect(wrapper.find(".dropdown-trigger").text()).toBe(triggerText);
  });

  test("it contains the passed dropdown items", () => {
    const first = "first item";
    const second = "second item";
    const third = "third item";

    const wrapper = buildWrapper(`
          <dropdown-item titleText="${first}" />
          <dropdown-item titleText="${second}" />
          <dropdown-item titleText="${third}" />
        `);

    const dropdownItems = wrapper.findAll(".dropdown-item");
    expect(dropdownItems.length).toBe(3);
    for (const item of [ first, second, third ]) {
      expect(dropdownItems.some(node => node.text() === item)).toBeTrue();
    }
  });

  test("divider appears correctly", () => {
    const wrapper = buildWrapper("<dropdown-divider />")

    expect(wrapper.find("hr").exists()).toBeTrue();
    expect(wrapper.get("hr").element.classList).toContain("dropdown-divider");
  });

  test("it is closed when open is false", () => {
    const wrapper = buildWrapper("", { open: false });

    expect(wrapper.element.classList).not.toContain("is-active");
  });

  test("it is open when open is true", () => {
    const wrapper = buildWrapper("", { open: true });

    expect(wrapper.element.classList).toContain("is-active");
  });

  test("it is open after clicking the trigger", async () => {
    const wrapper = buildWrapper("");

    await clickTrigger(wrapper);

    expect(wrapper.element.classList).toContain("is-active");
  });

  test("it emits an open event after clicking the trigger", async () => {
    const wrapper = buildWrapper("");

    await clickTrigger(wrapper);

    expect(getFirstEmission(wrapper, "update:open")).toBeTrue();
  });

  test("when open, it gets closed when clicking anywhere", async () => {
    const wrapper = buildWrapper("", {});

    // First, open it
    await clickTrigger(wrapper);
    expect(wrapper.element.classList).toContain("is-active");

    // Trigger the requestAnimationFrame
    jest.runAllTimers();

    // XXX: .dropdown-content is not the trigger and thus should count as
    // clicking anywhere
    await wrapper.get(".dropdown-content").trigger("click");
     
    expect(wrapper.element.classList).not.toContain("is-active");
  });

  test("when clicking an item, it's set as active", async () => {
    const wrapper = buildWrapper(`
      <dropdown-item titleText="${firstTestItem}" />
      <dropdown-item titleText="${secondTestItem}" />
    `, { open: true });

    expect(findItemByText(wrapper, firstTestItem).element.classList).not.toContain("is-active");
    await findItemByText(wrapper, firstTestItem).trigger("click");

    expect(findItemByText(wrapper, firstTestItem).element.classList).toContain("is-active");
  });

  test("also, when clicking an item, an event is emitted to set it as active", async () => {
    const wrapper = buildWrapper(`
      <dropdown-item titleText="${firstTestItem}" />
      <dropdown-item titleText="${secondTestItem}" />
    `, { open: true });

    await findItemByText(wrapper, firstTestItem).trigger("click");

    expect(getFirstEmission(wrapper, "update:activeItemId")).toBe(firstTestItem);
  });

});
