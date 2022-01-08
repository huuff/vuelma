<template>
<div class="navbar-item has-dropdown" :class="{
    'is-active': actualOpen,
    'has-dropdown-up': direction === 'up',
    'is-hoverable': hoverable,
  }">
  <a class="navbar-link" 
    :class="{ 'is-arrowless': arrowless }"
    @click="actualOpen = !actualOpen">
    {{ triggerText }}
  </a>
  <render></render>
</div>
</template>

<script setup lang="ts">
import { useSlots, VNode, toRef, h } from 'vue';
import DropdownItem, { DropdownItemProps } from '@/components/dropdown/DropdownItem.vue'
import DropdownDivider from '../dropdown/DropdownDivider.vue';
import { DropdownDirection } from '@/components/dropdown/BaseDropdown.vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { useCloseOnClickOutside } from '@/composables/close-on-click-outside';
import partial from "lodash/partial";
import { renderNavbarItem } from './render-navbar-item';
import classnames from 'classnames';

const props = withDefaults(defineProps<{
  triggerText?: string;
  activeItem?: string;
  direction?: DropdownDirection;
  open?: boolean;
  hoverable?: boolean;
  isRight?: boolean;
  arrowless?: boolean;
}>(), {
  open: undefined,
  direction: "down",
});

const emit = defineEmits<{
  (event: "update:activeItem", itemId?: string): void;
  (event: "update:open", open: boolean): void;
}>();

//eslint-disable-next-line
//@ts-ignore
const actualActiveItem = useOptionalTwoWayBinding(undefined, toRef(props, "activeItem"), partial(emit, "update:activeItem"));

//eslint-disable-next-line
//@ts-ignore
const actualOpen = useOptionalTwoWayBinding(false, toRef(props, "open"), partial(emit, "update:open"));
useCloseOnClickOutside(actualOpen);

function renderNode(node: VNode): VNode {
  if (node.type === DropdownItem) {
    const itemProps = node.props as DropdownItemProps;
    return renderNavbarItem("a", node, actualActiveItem, itemProps);
  } else if (node.type === DropdownDivider) {
    return h("hr", { class: "navbar-divider" });
  } else {
    throw new Error("Children of a NavbarDropdown must be DropdownItems or DropdownDividers!")
  }
}

const slots = useSlots();
const render = () => h(
  "div",
  {
    class: classnames({
      "is-right": props.isRight
    }, "navbar-dropdown"),
  },
  slots.default && slots.default().map(renderNode)
)

</script>
