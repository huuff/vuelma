<template>
<render></render>
</template>

<script setup lang="ts">
// TODO: Test it, but since I'm using a render function I don't think it'll be possible until I find a solution to the issue I posted 
// XXX: Currently, my solution to mark as active is just marking as active in the client-side the element in the slot. Maybe there's some better solution but I can't think of it
import { h, useSlots } from 'vue';

const props = defineProps<{
  label?: string;
}>();

const slots = useSlots();

function wrapSlotInLIs() {
  return slots.default!().map(elem => h('li', {}, elem));
}

const render = () => [
  props.label ? h("p", { 'class': 'menu-label' }, props.label) : undefined,
  h('ul', { 'class': 'menu-list'}, wrapSlotInLIs() )
];
</script>
