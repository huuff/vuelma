import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import BaseBreadcrumb from "@/components/breadcrumb/BaseBreadcrumb.vue";
import BreadcrumbItem from "@/components/breadcrumb/BreadcrumbItem.vue";
import { getFirstEmission } from "../util";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);

const firstItem = "firstitem";
const secondItem = "seconditem";
const thirdItem = "thirditem";

const defaultDefaultSlot = `
  <breadcrumb-item titleText="${firstItem}" />
  <breadcrumb-item titleText="${secondItem}" />
  <breadcrumb-item titleText="${thirdItem}" icon="heart"/>
`;

function buildWrapper({ activeItemId, defaultSlot }: { activeItemId?: string, defaultSlot?: string} = {}): VueWrapper {
  return mount(BaseBreadcrumb, {
    ...(activeItemId ? { props: { activeItemId }} : {}),
    global: {
      components: { BreadcrumbItem, FontAwesomeIcon }
    },
    slots: {
      default: defaultSlot ?? defaultDefaultSlot,
    },
  });
}

function findItemByText(wrapper: VueWrapper, text: string): DOMWrapper<Element> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapper.findAll(".breadcrumb li").find(it => it.text() === text)!;
}

describe("BaseBreadcrumb.vue", () => {
  test("items appear as breadcrumbs", () => {
    const wrapper = buildWrapper();

    expect(wrapper.findAll(".breadcrumb li").length).toBe(3);
    expect(findItemByText(wrapper, firstItem).exists()).toBeTrue();
    expect(findItemByText(wrapper, secondItem).exists()).toBeTrue();
    expect(findItemByText(wrapper, thirdItem).exists()).toBeTrue();
  });

  test("icon appears", () => {
    const wrapper = buildWrapper();

    const itemWithIcon = findItemByText(wrapper, thirdItem);

    expect(itemWithIcon.findComponent(FontAwesomeIcon).exists()).toBeTrue();
    expect(itemWithIcon.getComponent(FontAwesomeIcon).props().icon).toBe("heart");
  });

  test("active item is active", () => {
    const activeItemId = firstItem;
    const wrapper = buildWrapper( { activeItemId });

    console.log(wrapper.html());
    expect(findItemByText(wrapper, activeItemId).element.classList).toContain("is-active");
  });

  test("clicking on an item sets it as active", async () => {
    const wrapper = buildWrapper();
    const targetItem = findItemByText(wrapper, firstItem);

    // Sanity check: it isn't initially active
    expect(targetItem.element.classList).not.toContain("is-active");

    await targetItem.get("a").trigger("click");

    expect(targetItem.element.classList).toContain("is-active");
  });

  test("clicking on an item emits an event to mark it as active", async () => {
    const wrapper = buildWrapper();
    const targetItem = firstItem;
    
    await findItemByText(wrapper, targetItem).get("a").trigger("click");

    expect(getFirstEmission(wrapper, "update:activeItemId")).toBe(targetItem);
  });
});
