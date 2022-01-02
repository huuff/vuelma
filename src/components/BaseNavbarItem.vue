<template>
<render></render>
</template>

<script setup lang="ts">
import { useSlots, cloneVNode, h, inject } from 'vue';

const props = defineProps<{
  title: string;
}>();

const activeNavbarItem = inject('activeNavbarItem') as () => string;

const slots = useSlots();

const render = () => {
  if (!slots.default || slots.default().length !== 1) {
    throw new Error("A BaseNavbarItem must have exactly one child element!")
  }

  const slotAsNavbarItem = cloneVNode(slots.default()[0], { class: `navbar-item ${activeNavbarItem() === props.title ? 'is-active' : null}`})

  if (!slotAsNavbarItem.props) {
    slotAsNavbarItem.props = {};
  }

const setActiveNavbarItem = inject('setActiveNavbarItem') as (title: string) => void;
slotAsNavbarItem.props.onClick = () => setActiveNavbarItem(props.title);

  return h(slotAsNavbarItem, {}, () => props.title);
};
</script>
