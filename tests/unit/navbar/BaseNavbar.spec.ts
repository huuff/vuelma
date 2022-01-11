import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import BaseNavbar from "@/components/navbar/BaseNavbar.vue";
import NavbarItem from "@/components/navbar/NavbarItem.vue";
import { BulmaColor } from "@/types/bulma-color";
import { getFirstEmission } from "../util";

beforeEach(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

// HACK: Forced to put it here because of https://github.com/vuejs/vue-cli/issues/6924
type NavbarProps = {
  activeItem?: string;
  mobileMenuOpen?: boolean;
  color?: BulmaColor;
}

type Slots = {
  brand?: string;
  start?: string;
  end?: string;
};

const firstItem = "firstitem";
const secondItem = "seconditem";
const thirdItem = "thirditem";

const itemsSlot = `
        <navbar-item titleText="${firstItem}" />
        <navbar-item titleText="${secondItem}" />
        <navbar-item titleText="${thirdItem}" />
    `;

function buildWrapper(props: NavbarProps = {}, slots: Slots = {}): VueWrapper {
  // eslint-disable-next-line
  // @ts-ignore
  return mount(BaseNavbar, {
    props,
    global: {
      components: { NavbarItem, },
      renderStubDefaultSlot: true,
    },
    slots,
    attachTo: document.documentElement,
  });
}

function findItemByText(wrapper: VueWrapper, text: string): DOMWrapper<Element> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapper.findAll(".navbar-item").find(it => it.text() === text)!;
}

describe("BaseNavbar.vue", () => {
  test("items are added as navbar-items", () => {
    const wrapper = buildWrapper({}, { end: itemsSlot, });

    expect(wrapper.findAll(".navbar-end .navbar-item").length).toBe(3);
    expect(findItemByText(wrapper, firstItem)).toBeDefined();
    expect(findItemByText(wrapper, secondItem)).toBeDefined();
    expect(findItemByText(wrapper, thirdItem)).toBeDefined();
  }); 

  test("the active item is marked as active", () => {
    const activeItem = firstItem;
    const wrapper = buildWrapper({ activeItem }, { end: itemsSlot, });

    expect(wrapper.findAll(".navbar-item.is-active").length).toBe(1);
    expect(findItemByText(wrapper, activeItem).element.classList).toContain("is-active");
  });

  test("clicking an item makes it active", async () => {
    const wrapper = buildWrapper({}, { end: itemsSlot });
    const targetItem = findItemByText(wrapper, firstItem);

    // Sanity check: the item is not initially active
    expect(targetItem.element.classList).not.toContain("is-active");

    await targetItem.trigger("click");
    expect(targetItem.element.classList).toContain("is-active");
  });

  test("clicking an item emits an event to set it as active", async () => {
    const wrapper = buildWrapper({}, { end: itemsSlot, });
    const targetItem = firstItem;

    await findItemByText(wrapper, targetItem).trigger("click");
    expect(getFirstEmission(wrapper, "update:activeItem")).toBe(targetItem);
  });

  test("mobile menu is initially closed", () => {
    const wrapper = buildWrapper();

    expect(wrapper.get(".navbar-menu").element.classList).not.toContain("is-active");
  });

  test("passing mobileMenuOpen makes the menu open", () => {
    const wrapper = buildWrapper({ mobileMenuOpen: true });
    
    expect(wrapper.get(".navbar-menu").element.classList).toContain("is-active");
  });

  test("clicking the navbar-burger opens the menu", async () => {
    const wrapper = buildWrapper();

    // Sanity check: it's initially closed
    expect(wrapper.get(".navbar-menu").element.classList).not.toContain("is-active");

    await wrapper.get(".navbar-burger").trigger("click");

    expect(wrapper.get(".navbar-menu").element.classList).toContain("is-active");
  });

  test("clicking the navbar-burger emits an event to open the menu", async () => {
    const wrapper = buildWrapper();

    await wrapper.get(".navbar-burger").trigger("click");

    expect(getFirstEmission(wrapper, "update:mobileMenuOpen")).toBe(true);
  });

  test("clicking anywhere after the mobile menu is open closes it", async () => {
    const wrapper = buildWrapper();

    await wrapper.get(".navbar-burger").trigger("click");
    // Sanity check: it's now open
    expect(wrapper.get(".navbar-menu").element.classList).toContain("is-active");

    // Trigger the requestAnimationFrame
    jest.runAllTimers();

    // Since `.navbar` is the outer element, clicking on it counts as clicking outside
    await wrapper.trigger("click");
    expect(wrapper.get(".navbar-menu").element.classList).not.toContain("is-active");
  });
});
