<template>
<slot></slot>
</template>

<script setup lang="ts">
// TODO: Add icons

const props = defineProps<{
  title: string;
  tabId: string;
}>();
</script>
