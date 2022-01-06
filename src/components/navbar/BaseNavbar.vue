<template>
<render></render>
</template>

<script setup lang="tsx">
// TODO: other variants
// TODO: Test it, but I can't because of https://github.com/vuejs/vue-cli/issues/6911
import { useSlots, VNode, toRef, cloneVNode } from 'vue';
import NavbarItem, { NavbarItemProps } from './NavbarItem.vue';
import classnames from "classnames";
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
// TODO: Write most of it into the template and only the slots in the render?
const render = () => 
<nav 
  class={classnames({
    "navbar": true,
    [`is-${props.color}`]: props.color,
  })}
  role="navigation" 
  aria-label="navigation">
  <div class="navbar-brand">
    { slots.brand && unwrapFragment(slots.brand())
    .flatMap(node => unwrapFragment([node]))
    .map(node => renderNode(node)) }
    <a 
      role="button"
      class={classnames({
        "navbar-burger": true,
        "is-active": actualMobileMenuOpen.value,
      })}
      aria-label="menu"
      aria-expanded={ actualMobileMenuOpen.value ? "true" : "false"}
      onClick={() => actualMobileMenuOpen.value = true}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  
  <div class={classnames({
    "navbar-menu": true,
    "is-active": actualMobileMenuOpen.value,
  })}>
    { slots.start &&
      <div class="navbar-start">
        { (unwrapFragment(slots.start()))
        .flatMap(node => unwrapFragment([node]))
        .map(node => renderNode(node)) }
      </div>
    }
    {
      slots.end &&
      <div class="navbar-end">
        { unwrapFragment(slots.end())
        .flatMap(node => unwrapFragment([node]))
        .map(node => renderNode(node, true)) }
      </div>
    }
  </div>
</nav>
</script>
