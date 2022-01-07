<template>
<aside class="menu">
  <render-lists />
</aside>
</template>

<script setup lang="tsx">
import { useSlots, toRef, VNode, Slots} from 'vue';
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

    return (
      <li>
        <a 
          class={classnames({ 'is-active': getId(itemProps) === actualActiveItemId.value })}
          onClick={() => actualActiveItemId.value = getId(itemProps)}
        >
          { itemProps.titleText } 
        </a>
      </li>
    );
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
    <p class="menu-label"> { listProps.label } </p>,
    <ul class="menu-list">
    { renderItems(unwrapFragment(items)) } 
    </ul>
  ];
});
</script>
