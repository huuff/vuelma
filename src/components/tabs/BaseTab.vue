<template>
<slot></slot>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string;
  tabId: string;
}>();
</script>
