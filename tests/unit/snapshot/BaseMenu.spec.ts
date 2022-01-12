import { mount } from "@vue/test-utils";
import BaseMenu from "@/components/menu/BaseMenu.vue";
import MenuList from "@/components/menu/MenuList.vue";
import MenuItem from "@/components/menu/MenuItem.vue";

test("BaseMenu.vue snapshot", () => {
  const wrapper = mount(BaseMenu, {
    props: {
      activeItemId: "Item 1",
    },
    global: {
      components: { MenuList, MenuItem },
    },
    slots: {
      default: `
        <menu-list label="List">
          <menu-item titleText="Item 1" />
          <menu-item titleText="Item 2" />
          <menu-list label="Stacked">
            <menu-item titleText="Item 3" />
            <menu-item titleText="Item 4" />
            <menu-item titleText="Item 5" />
          </menu-list>
        </menu-list>
      `,
    },
  });

  expect(wrapper.element).toMatchSnapshot();
});
