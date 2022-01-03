<template>
<article class="message" v-show="actualShow" :class="`is-${color}`">
  <header class="message-header">
    <p v-if="title">{{ title }}</p>
    <slot name="header"></slot>
    <button v-if="closeable"
      class="delete"
      aria-label="delete"
      @click="actualShow = false"
    ></button>
  </header>
  <div class="message-body">
    <slot></slot>
  </div>
</article>
</template>

<script setup lang="ts">
import { useSlots, toRef } from 'vue';
import { BulmaColor } from '@/types/bulma-color';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';

const props = withDefaults(defineProps<{
  title?: string;
  closeable?: boolean;
  show?: boolean;
  color?: BulmaColor;
}>(), {
  closeable: false,
  show: undefined,
  color: 'dark',
});

const emit = defineEmits<{
  (event: 'update:show', newShow: boolean): void
}>();

const actualShow = useOptionalTwoWayBinding(true, toRef(props, "show"), (show) => emit('update:show', show));

const slots = useSlots();

if (props.title && slots.header) {
  throw new Error("In a BaseMessage component, can't have a title and a header at the same time!")
}
</script>
