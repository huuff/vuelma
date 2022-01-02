<template>
<render></render>
</template>

<script setup lang="ts">
import { useSlots, cloneVNode, h, inject } from 'vue';
import { SetActiveNavbarItemKey, ActiveNavbarItemKey } from '@/symbols';

const props = defineProps<{
  itemId: string;
}>();

const activeNavbarItem = inject(ActiveNavbarItemKey);
const setActiveNavbarItem = inject(SetActiveNavbarItemKey);

if (!activeNavbarItem || !setActiveNavbarItem) {
  throw new Error("Some necessary value wasn't provided from BaseNavbar to BaseNavbarItem!")
}

const slots = useSlots();

const render = () => {
  if (!slots.default || slots.default().length !== 1) {
    throw new Error("A BaseNavbarItem must have exactly one child element!")
  }

// TODO: Fix so null doesn't appear in the class
// TODO: Does it preserve the classes?
  const slotAsNavbarItem = cloneVNode(slots.default()[0], { class: `navbar-item ${activeNavbarItem() === props.itemId ? 'is-active' : null}`})

  if (!slotAsNavbarItem.props) {
    slotAsNavbarItem.props = {};
  }

  slotAsNavbarItem.props.onClick = () => setActiveNavbarItem(props.itemId);

  return slotAsNavbarItem;
};
</script>
