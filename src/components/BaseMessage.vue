<template>
<article class="message">
  <header class="message-header">
    <p v-if="title">{{ title }}</p>
    <slot name="header"></slot>
    <button v-if="closeable"
      class="delete"
      aria-label="delete"
    ></button>
  </header>
  <div class="message-body">
    <slot></slot>
  </div>
</article>
</template>

<script setup lang="ts">
// TODO: Some cool two-way binding so this can be closed/open
// both from inside the component and from outside
// maybe a custom directive will do?
import { useSlots } from 'vue';

const props = withDefaults(defineProps<{
  title?: string;
  closeable: boolean;
}>(), {
  closeable: false
});

const slots = useSlots();

if (props.title && slots.header) {
  throw new Error("In a BaseMessage component, can't have a title and a header at the same time!")
}

</script>
