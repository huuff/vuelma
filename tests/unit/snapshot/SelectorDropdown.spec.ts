import { mount } from "@vue/test-utils";
import SelectorDropdown from "@/components/dropdown/SelectorDropdown.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import DropdownItem from "@/components/dropdown/DropdownItem.vue";
import DropdownDivider from "@/components/dropdown/DropdownDivider.vue";

test("SelectorDropdown.vue snapshot", () => {
  const wrapper = mount(SelectorDropdown, {
    props: {
      triggerText: "Click here",
      open: true,
      activeItemId: "Item 1",
    },
    global: {
      components: { BaseDropdown, DropdownItem, DropdownDivider },
    },
    slots: {
      default: `
        <dropdown-item titleText="Item 1" />
        <dropdown-item titleText="Item 2" />
        <dropdown-item titleText="Item 3" />
      `
    },
  });
});
