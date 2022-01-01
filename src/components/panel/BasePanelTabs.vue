<template>
<render></render>
</template>

<script setup lang="ts">
import { h, useSlots } from 'vue';


const slots = useSlots();

const props = defineProps<{
  active: string;
}>();

function tabsFromSlots() {
  return Object.keys(slots).map(slotName => h(
    'a',
    { 'class': { 'is-active': props.active === slotName } },
    slotName
  ));
}

const render = () => {
  return [
    h('p', { 'class': 'panel-tabs'}, tabsFromSlots()),
    slots[props.active]!(),
  ];
};
</script>
