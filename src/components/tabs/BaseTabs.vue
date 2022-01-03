<template>
<render></render>
</template>

<script setup lang="ts">
// TODO: Icons
// TODO: Test it
import { h, useSlots, toRef } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import partial from "lodash/partial";

const props = defineProps<{
  activeTab?: string;
}>();
const emit = defineEmits<{
  (event: "update:activeTab", id?: string): void;
}>();

const actualActiveTab = useOptionalTwoWayBinding(undefined, toRef(props, "activeTab"), partial(emit, "update:activeTab"));

const slots = useSlots();

function tabsFromSlots() {
  return Object.keys(slots).map(slotName => h(
    'li',
    actualActiveTab.value === slotName ? { class: "is-active"} : {},
    h('a', {
      onClick: () => actualActiveTab.value = slotName,
    }, slotName)
  ));
}

const render = () => {
  return [
    h("div", { class: "tabs" }, 
      h('ul', tabsFromSlots()),
    ),
    actualActiveTab.value ? slots[actualActiveTab.value]!() : undefined
  ];
};
</script>
