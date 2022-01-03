<template>
<render></render>
</template>

<script setup lang="ts">
import { h, useSlots, } from 'vue';
import { injectAccessors } from '@/composables/injected-accessors';

const slots = useSlots();

const activeTab = injectAccessors<string>("ActivePanelTab");

function tabsFromSlots() {
  return Object.keys(slots).map(slotName => h(
    'a',
    { 
      'class': { 'is-active': activeTab.value === slotName },
      onClick: () => {
        activeTab.value = slotName;
      },
    },
    slotName
  ));
}

const render = () => {
  return [
    h('p', 
    { 'class': 'panel-tabs',  },
    tabsFromSlots()),
    slots[activeTab.value] ? slots[activeTab.value]!() : undefined,
  ];
};
</script>
