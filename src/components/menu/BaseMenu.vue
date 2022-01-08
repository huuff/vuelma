<template>
<aside class="menu">
  <render-lists />
</aside>
</template>

<script setup lang="ts">
// TODO: Stacked?
import { useSlots, toRef, VNode, Slots, h} from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { unwrapFragment } from '@/util/unwrap-fragment';
import MenuList, { MenuListProps } from './MenuList.vue';
import MenuItem, { MenuItemProps } from './MenuItem.vue';
import { getId } from "@/util/optional-id";
import partial from "lodash/partial";
import classnames from "classnames";

const props = defineProps<{
  activeItemId?: string;
}>();

const emit = defineEmits<{
  (event: "update:activeItemId", itemId?: string): void; 
}>();

const actualActiveItemId = useOptionalTwoWayBinding(undefined, toRef(props, "activeItemId"), partial(emit, "update:activeItemId"));


function renderItems(items: VNode[]): VNode[] {
  if (items.some(item => !(item.type === MenuItem))) {
    throw new Error("renderItems: The children of a MenuList must be MenuItems!");
  }

  return items.map(item => {
    const itemProps = item.props as MenuItemProps;
    const itemId = getId(itemProps);

    return h(
      "li",
      {},
      h(
        // eslint-disable-next-line
        // @ts-ignore
        itemProps.tag ?? "a", 
        { ...itemProps,
          class: classnames({ "is-active": itemId === actualActiveItemId.value}, item.props?.class),
          onClick: () => actualActiveItemId.value = itemId,
        },
        itemProps.titleText
      )
    )
  });
}

const slots = useSlots();
const renderLists = () => slots.default && unwrapFragment(slots.default()).map(node => {
  if (node.type !== MenuList) {
    throw new Error("The direct children of a BaseMenu must be MenuLists");
  }

  const menuSlot = (node.children as Slots).default;
  const items = menuSlot && menuSlot();
  if (!Array.isArray(items)) {
    throw new Error("renderItems: The children of a MenuList must be MenuItems!");
  }

  const listProps = node.props as MenuListProps;

  return [
    h(
      "p",
      { class: "menu-label" },
      listProps.label
    ),
    h(
      "ul",
      { class: "menu-list" },
      renderItems(unwrapFragment(items))
    )
  ];
});
</script>
