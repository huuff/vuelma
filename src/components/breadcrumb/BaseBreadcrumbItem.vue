<template>
<render></render>
</template>

<script setup lang="ts">
import { h, useSlots, cloneVNode } from 'vue';
import { injectAccessors } from '@/composables/injected-accessors';

const props = defineProps<{
  itemId: string;
}>();

const active = injectAccessors<string>("ActiveBreadcrumbItem");

const slots = useSlots();

const render = () => {
  if (!slots.default) {
    throw new Error("BaseBreadcrumbItem requires a filled default slot!");
  }

  return h(
    "li",
    props.itemId === active.value ? { class: "is-active" } : {},
    cloneVNode(slots.default()[0], {
      onClick: () => active.value = props.itemId,
    })
  );
}
</script>
