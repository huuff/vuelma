<template>
<render></render>
</template>

<script setup lang="ts">
import { h } from 'vue';

const props = defineProps({
  renderFunction: {
    required: true,
  }
});

const render = () => {
  return h("h1", "test");
}
</script>
