<template>
<render></render>
</template>

<script setup lang="ts">
import { inject, h, useSlots, cloneVNode } from 'vue';
import { SetActiveBreadcrumbItemKey, ActiveBreadcrumbItemKey } from './symbols';

const props = defineProps<{
  itemId: string;
}>();

const activeId = inject(ActiveBreadcrumbItemKey);
const setActiveId = inject(SetActiveBreadcrumbItemKey)

if (!activeId || !setActiveId) {
  throw new Error("Either active id or a method to set active id was not provided from BaseBreadcrumb to BaseBreadcrumbItem");
}

const slots = useSlots();


const render = () => {
  if (!slots.default) {
    throw new Error("BaseBreadcrumbItem requires a filled default slot!");
  }

  return h(
    "li",
    props.itemId === activeId() ? { class: "is-active" } : {},
    cloneVNode(slots.default()[0], {
      onClick: () => setActiveId(props.itemId)
    })
  );
}
</script>
