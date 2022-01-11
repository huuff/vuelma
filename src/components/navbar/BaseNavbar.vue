<template>
<nav :class="{
  'navbar': true,
  [`is-${color}`]: color,
}"
  role="navigation"
  aria-label="navigation"
>
  <div class="navbar-brand">
    <render-items slotName="brand" />
    <a 
      role="button"
      :class="{
        'navbar-burger': true,
        'is-active': actualMobileMenuOpen,
      }"
      aria-label="menu"
      :aria-expanded="actualMobileMenuOpen"
      @click="actualMobileMenuOpen = !actualMobileMenuOpen"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div :class="{
    'navbar-menu': true,
    'is-active': actualMobileMenuOpen,
  }">
    <div class="navbar-start">
      <render-items slotName="start" />
    </div>
    <div class="navbar-end">
      <render-items slotName="end" />
    </div>
  </div>
</nav>
</template>

<script setup lang="ts">
import { useSlots, VNode, toRef, cloneVNode } from 'vue';
import NavbarItem, { NavbarItemProps } from './NavbarItem.vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import partial from "lodash/partial";
import { unwrapFragment } from '@/util/unwrap-fragment';
import { useCloseOnClickOutside } from '@/composables/close-on-click-outside';
import NavbarDropdown from './NavbarDropdown.vue';
import { BulmaColor } from '@/types/bulma-color';
import { renderNavbarItem } from './render-navbar-item';

const props = withDefaults(defineProps<{
  activeItem?: string;
  mobileMenuOpen?: boolean;
  color?: BulmaColor;
}>(), {
  mobileMenuOpen: undefined,
});

const emit = defineEmits<{
  (event: "update:activeItem", itemId?: string): void;
  (event: "update:mobileMenuOpen", open: boolean): void;
}>();

// eslint-disable-next-line
// @ts-ignore
const actualActiveItem = useOptionalTwoWayBinding(undefined, toRef(props, "activeItem"), partial(emit, "update:activeItem"));

// eslint-disable-next-line
// @ts-ignore
const actualMobileMenuOpen = useOptionalTwoWayBinding(false, toRef(props, "mobileMenuOpen"), partial(emit, "update:mobileMenuOpen"))
useCloseOnClickOutside(actualMobileMenuOpen);

function renderNode(node: VNode, isEnd = false): VNode {
  if (node.type === NavbarItem) {
    const itemProps = node.props as NavbarItemProps;
    return renderNavbarItem(itemProps.tag ?? "a", node, actualActiveItem, itemProps);
  } else if (node.type === NavbarDropdown) {
    return !isEnd ? node : cloneVNode(node, { isRight: true});
  }
  throw new Error("Children of a BaseNavbar must be NavbarItems!");
}

const slots = useSlots();
type RenderProps = {
  slotName: keyof typeof slots;
}

const renderItems = (props: RenderProps) => {
  return slots[props.slotName] && unwrapFragment(slots[props.slotName]!())
    .flatMap(node => unwrapFragment([node]))
    .map(node => renderNode(node, props.slotName === 'end'));
}
</script>
