<template>
<div class="navbar-item has-dropdown" :class="{
    'is-active': actualOpen,
    'has-dropdown-up': direction === 'up',
    'is-hoverable': hoverable,
    'is-right': isRight,
  }">
  <a class="navbar-link" @click="actualOpen = !actualOpen">
    {{ triggerText }}
  </a>
  <render></render>
</div>
</template>

<script setup lang="tsx">
// TODO: arrowless
import { useSlots, VNode, h, toRef } from 'vue';
import DropdownItem, { DropdownItemProps } from '@/components/dropdown/DropdownItem.vue'
import DropdownDivider from '../dropdown/DropdownDivider.vue';
import { DropdownDirection } from '@/components/dropdown/BaseDropdown.vue';
import classnames from 'classnames';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { useCloseOnClickOutside } from '@/composables/close-on-click-outside';
import partial from "lodash/partial";

const props = withDefaults(defineProps<{
  triggerText?: string;
  activeItem?: string;
  direction?: DropdownDirection;
  open?: boolean;
  hoverable?: boolean;
  isRight?: boolean;
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
    // TODO: Almost the exact same code as the render node of BaseNavbar, can I dry it somehow?
    const itemProps = node.props as DropdownItemProps;
    const itemId = itemProps.itemId ?? itemProps.text;
    return h("a",
        { ...itemProps,
          class: classnames({
            "navbar-item": true,
            "is-active": actualActiveItem.value === itemId,
          }) + [ ` ${node.props?.class}`], // TODO: repeated here and in BaseNavbar, extract it to an util function? Also, it's adding undefined as a class
          onClick: () => actualActiveItem.value = itemId,
        },
        { default: () => itemProps.text }
      );
  } else if (node.type === DropdownDivider) {
    return <hr class="navbar-divider"/>
  } else {
    throw new Error("Children of a NavbarDropdown must be DropdownItems or DropdownDividers!")
  }
}

const slot = useSlots();
const render = () => 
<div class="navbar-dropdown">
  { slot.default && slot.default().map(renderNode) }
</div>

</script>
