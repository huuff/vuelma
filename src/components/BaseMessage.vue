<template>
<article class="message" v-show="showModel">
  <header class="message-header">
    <p v-if="title">{{ title }}</p>
    <slot name="header"></slot>
    <button v-if="closeable"
      class="delete"
      aria-label="delete"
      @click="showModel = false"
    ></button>
  </header>
  <div class="message-body">
    <slot></slot>
  </div>
</article>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue';

const props = withDefaults(defineProps<{
  title?: string;
  closeable?: boolean;
  show?: boolean;
}>(), {
  closeable: false,
  show: true,
});

const emit = defineEmits<{
  (event: 'update:show', val: boolean): void;
}>();

const showModel = computed({
  get: () => props.show,
  set: (val: boolean) => emit('update:show', val),
});

const slots = useSlots();

if (props.title && slots.header) {
  throw new Error("In a BaseMessage component, can't have a title and a header at the same time!")
}
</script>
