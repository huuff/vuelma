import { mount, VueWrapper } from "@vue/test-utils";
import SelectorDropdown from "@/components/dropdown/SelectorDropdown.vue";
import DropdownItem from "@/components/dropdown/DropdownItem.vue";

const firstItem = "First";
const secondItem = "Second";
const triggerText = "Trigger";

function buildWrapper(activeItemId?: string): VueWrapper {
  return mount(SelectorDropdown, {
    props: {
      triggerText,
      ...( activeItemId ? { activeItemId }: {})
    },
    global: {
      components: { DropdownItem },
    },
    slots: {
      default: `
        <dropdown-item titleText="${firstItem}" />
        <dropdown-item titleText="${secondItem}" />
      `,
    }
  });
}

describe("SelectorDropdown.vue", () => {
  test("if no item is active, the triggerText appears on the trigger button", () => {
    const wrapper = buildWrapper();

    expect(wrapper.get(".dropdown-trigger button").text()).toBe(triggerText);
  });

  test("is an item is active, it appears on the trigger button", () => {
    const wrapper = buildWrapper(firstItem);

    expect(wrapper.get(".dropdown-trigger button").text()).toBe(firstItem);
  });
});
