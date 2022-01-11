import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import BaseMenu from "@/components/menu/BaseMenu.vue";
import MenuList from "@/components/menu/MenuList.vue";
import MenuItem from "@/components/menu/MenuItem.vue";
import { getFirstEmission } from "./util";

type BuildWrapperParams = {
  activeItemId?: string;
  defaultSlot?: string;
}

function buildWrapper( { activeItemId, defaultSlot }: BuildWrapperParams): VueWrapper {
  return mount(BaseMenu, {
    ...(activeItemId ? { props: { activeItemId }} : {}),
    global: {
      components: { MenuList, MenuItem },
    },
    ...(defaultSlot ? {
      slots: {
        default: defaultSlot,
      },
    } : {})
  })
}

function findItemByText(wrapper: VueWrapper, text: string): DOMWrapper<Element> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapper.findAll(".menu-list li a").find(item => item.text() === text)!;
}

describe("BaseMenu.vue", () => {
  test("menu label appears", () => {
    const label = "testlabel";
    const wrapper = buildWrapper({ defaultSlot: `
      <menu-list label="${label}">
        <menu-item titleText="test" />
      </menu-list>
    `});

    expect(wrapper.find(".menu-label").exists()).toBeTrue();
    expect(wrapper.get(".menu-label").text()).toBe(label);
  });

  test("menu items appear", () => {
    const firstItem = "firstitem";
    const secondItem = "seconditem";

    const wrapper = buildWrapper({ defaultSlot: `
      <menu-list label="test">
        <menu-item titleText="${firstItem}" />
        <menu-item titleText="${secondItem}" />
      </menu-list>
    `});

    expect(wrapper.findAll(".menu-list li").length).toBe(2);
    expect(findItemByText(wrapper, firstItem)).not.toBeUndefined();
    expect(findItemByText(wrapper, secondItem)).not.toBeUndefined();
  });

  test("active item is marked as active", () => {
    const firstItem = "firstitem";
    const secondItem = "seconditem";
    const activeItemId = firstItem;

    const wrapper = buildWrapper({
      activeItemId,
      defaultSlot: `
        <menu-list label="test">
          <menu-item titleText="${firstItem}" />
          <menu-item titleText="${secondItem}" />
        </menu-list>
    `});

    expect(wrapper.findAll(".is-active").length).toBe(1);
    expect(findItemByText(wrapper, activeItemId).element.classList).toContain("is-active");
  });

  test("lists can be stacked", () => {
    const wrapper = buildWrapper({ defaultSlot: `
      <menu-list label="outer">
        <menu-list label="inner">
          <menu-item titleText="test" />
        </menu-list>
      </menu-list>
    `}); 

    const outer = wrapper.find("ul.menu-list");
    expect(outer.exists()).toBeTrue();
    expect(outer.find("ul.menu-list").exists()).toBeTrue();
  });

  test("clicking on an item sets it as active", async () => {
    const firstItem = "firstitem";
    const secondItem = "seconditem";

    const wrapper = buildWrapper({
      defaultSlot: `
        <menu-list label="test">
          <menu-item titleText="${firstItem}" />
          <menu-item titleText="${secondItem}" />
        </menu-list>
    `});
    const targetItem = findItemByText(wrapper, firstItem);
    expect(targetItem.element.classList).not.toContain("is-active");

    // Sanity check: the item is not initially active
    await targetItem.trigger("click");
    expect(targetItem.element.classList).toContain("is-active");
  });

  test("clicking on an item emits an event to set it as active", async () => {
    const firstItem = "firstitem";
    const secondItem = "seconditem";

    const wrapper = buildWrapper({
      defaultSlot: `
        <menu-list label="test">
          <menu-item titleText="${firstItem}" />
          <menu-item titleText="${secondItem}" />
        </menu-list>
    `});
    // Sanity check: the item is not initially active
    await findItemByText(wrapper, firstItem).trigger("click");
    
    expect(getFirstEmission(wrapper, "update:activeItemId")).toBe(firstItem);
  });
});
