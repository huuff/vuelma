<template>
<render></render>
</template>

<script setup lang="ts">
import { useSlots, cloneVNode, } from 'vue';
import { injectAccessors } from '@/composables/injected-accessors';

const props = defineProps<{
  itemId: string;
}>();

const active = injectAccessors<string>("ActiveNavbarItem");

const slots = useSlots();

const render = () => {
  if (!slots.default || slots.default().length !== 1) {
    throw new Error("A BaseNavbarItem must have exactly one child element!")
  }

  const slotAsNavbarItem = cloneVNode(slots.default()[0], { class: 'navbar-item' + (active.get() === props.itemId ? ' is-active' : '')});

  if (!slotAsNavbarItem.props) {
    slotAsNavbarItem.props = {};
  }

  slotAsNavbarItem.props.onClick = () => active.set(props.itemId);

  return slotAsNavbarItem;
};
</script>
