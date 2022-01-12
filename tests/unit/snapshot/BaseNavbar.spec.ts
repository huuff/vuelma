import { mount } from "@vue/test-utils";
import BaseNavbar from "@/components/navbar/BaseNavbar.vue";
import NavbarItem from "@/components/navbar/NavbarItem.vue";
import NavbarDropdown from "@/components/navbar/NavbarDropdown.vue";
import DropdownItem from "@/components/dropdown/DropdownItem.vue";
import DropdownDivider from "@/components/dropdown/DropdownDivider.vue";

test("BaseNavbar.vue snapshot", () => {
  const wrapper = mount(BaseNavbar, {
    props: {
      activeItem: "Item 1",
      color: "warning",
    },
    global: {
      components: { NavbarItem, NavbarDropdown, DropdownItem, DropdownDivider },
    },
    slots: {
      brand: `
        <navbar-item titleText="Brand"/>
      `,
      end: `
        <navbar-item titleText="Item 1" />
        <navbar-dropdown>
          <dropdown-item titleText="Item 2" />
          <dropdown-divider />
          <dropdown-item titleText="Item 3" />
        </navbar-dropdown>
      `,
    },
  });

  expect(wrapper.element).toMatchSnapshot();
});
