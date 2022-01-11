<template>
<aside class="menu">
  <render-lists />
</aside>
</template>

<script setup lang="ts">
import { useSlots, toRef, VNode, Slots, h} from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { unwrapFragment } from '@/util/unwrap-fragment';
import MenuList, { MenuListProps } from './MenuList.vue';
import MenuItem, { MenuItemProps } from './MenuItem.vue';
import { getId } from "@/util/optional-id";
import partial from "lodash/partial";
import classnames from "classnames";

const badMenuListChildrenErrorMessage = "The children of a MenuList must be MenuItems or MenuLists!";

const props = defineProps<{
  activeItemId?: string;
}>();

const emit = defineEmits<{
  (event: "update:activeItemId", itemId?: string): void; 
}>();

const actualActiveItemId = useOptionalTwoWayBinding(undefined, toRef(props, "activeItemId"), partial(emit, "update:activeItemId"));


function renderItem(item: VNode): VNode {
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
  );
}

function renderItems(items: VNode[]): VNode[] {
  return items.map(item => {
    if (item.type === MenuItem) {
      return renderItem(item);
    } else if (item.type === MenuList) {
      return h("li", {}, renderList(item));
    } else {
      throw new Error(badMenuListChildrenErrorMessage);
    }
  });
}

function renderList(node: VNode): VNode[] {
  const listProps = node.props as MenuListProps;

  const menuSlot = (node.children as Slots).default;
  const items = menuSlot && menuSlot();
  if (!Array.isArray(items)) {
    throw new Error(badMenuListChildrenErrorMessage);
  }

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
}

const slots = useSlots();
const renderLists = () => slots.default && unwrapFragment(slots.default()).map(node => {
  if (node.type !== MenuList) {
    throw new Error("The direct children of a BaseMenu must be MenuLists");
  }

  return renderList(node)
});
</script>
