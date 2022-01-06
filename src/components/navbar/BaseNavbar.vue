<template>
<render></render>
</template>

<script setup lang="tsx">
// TODO: mobile menu
// TODO: dropdown
// TODO: colors
// TODO: Test it, but I can't because of https://github.com/vuejs/vue-cli/issues/6911
import { useSlots, h, VNode, toRef, } from 'vue';
import NavbarItem, { NavbarItemProps } from './NavbarItem.vue';
import classnames from "classnames";
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import partial from "lodash/partial";
import { unwrapFragment } from '@/util/unwrap-fragment';

const props = defineProps<{
  activeItem?: string;
}>();

const emit = defineEmits<{
  (event: "update:activeItem", itemId?: string): void;
}>();

const actualActiveItem = useOptionalTwoWayBinding(undefined, toRef(props, "activeItem"), partial(emit, "update:activeItem"));

function renderNode(node: VNode): VNode {
  if (node.type === NavbarItem) {
    const itemProps = node.props as NavbarItemProps;
    const itemId = itemProps.itemId ?? itemProps.title;
    // HACK: Why this compilation error? I've checked the overloads
    // and it definitely exists.
    // eslint-disable-next-line
    // @ts-ignore
    return h(itemProps.tag ?? 'a',
      { ...itemProps,
        class: classnames({
          "navbar-item": true,
          "is-active": actualActiveItem.value === itemId,
        }) + [ ` ${node.props?.class}` ],
        onClick: () => actualActiveItem.value = itemId,
      },
      itemProps.title
    )
  }
  throw new Error("Children of a BaseNavbar must be NavbarItems");
}

const slots = useSlots();
const render = () => 
<nav class="navbar" role="navigation" aria-label="navigation">
  <div class="navbar-brand">
    { slots.brand && unwrapFragment(slots.brand()).map(renderNode) }
    <a 
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  
  <div class="navbar-menu">
    { slots.start &&
      <div class="navbar-start">
        { (unwrapFragment(slots.start())).map(renderNode) }
      </div>
    }
    {
      slots.end &&
      <div class="navbar-end">
        { unwrapFragment(slots.end()).map(renderNode) }
      </div>
    }
  </div>
</nav>
</script>
