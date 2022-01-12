import { mount } from "@vue/test-utils";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import DropdownItem from "@/components/dropdown/DropdownItem.vue";
import DropdownDivider from "@/components/dropdown/DropdownDivider.vue";

test("BaseDropdown.vue snapshot", () => {
  Math.random = jest.fn(() => 1);
  const wrapper = mount(BaseDropdown, {
    props: {
      triggerText: "Click here",
      activeItemId: "Item 1",
      color: "warning",
      open: true,
    }, 
    global: {
      components: { DropdownItem, DropdownDivider },
      stubs: [ "font-awesome-icon" ],
    },
    slots: {
      default: `
        <dropdown-item titleText="Item 1" />
        <div>Dropdown content</div>
        <dropdown-divider />
        <dropdown-item titleText="Item 2" />
      `,
    },
  });

  expect(wrapper.element).toMatchSnapshot();
});
