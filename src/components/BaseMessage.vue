<template>
<article class="message" v-show="show" :class="`is-${color}`">
  <header class="message-header">
    <p v-if="title">{{ title }}</p>
    <slot name="header"></slot>
    <button v-if="closeable"
      class="delete"
      aria-label="delete"
      @click="$emit('close')"
    ></button>
  </header>
  <div class="message-body">
    <slot></slot>
  </div>
</article>
</template>

<script setup lang="ts">
import { useSlots, } from 'vue';
import { BulmaColor } from '@/types/bulma-color';

const props = withDefaults(defineProps<{
  title?: string;
  closeable?: boolean;
  show?: boolean;
  color?: BulmaColor;
}>(), {
  closeable: false,
  show: true,
  color: 'dark',
});

const emit = defineEmits<{
  (event: 'close'): void
}>();

const slots = useSlots();

if (props.title && slots.header) {
  throw new Error("In a BaseMessage component, can't have a title and a header at the same time!")
}
</script>
