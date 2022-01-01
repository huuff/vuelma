<template>
<render></render>
</template>

<script setup lang="ts">
import { h, useSlots } from 'vue';

const slots = useSlots();

const props = defineProps<{
  active: keyof typeof slots;
}>();

const emit = defineEmits<{
  (event: 'setActiveTab', tab: string): void;
}>();

function tabsFromSlots() {
  return Object.keys(slots).map(slotName => h(
    'a',
    { 
      'class': { 'is-active': props.active === slotName },
      onClick: () => emit('setActiveTab', slotName),
    },
    slotName
  ));
}

const render = () => {
  return [
    h('p', 
    { 'class': 'panel-tabs',  },
    tabsFromSlots()),
    slots[props.active]!(),
  ];
};
</script>
