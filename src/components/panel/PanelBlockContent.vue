<template>
<slot></slot>
</template>

<script setup lang="ts">
// This is just a wrapper for block content

export type PanelBlockContentProps = {
  tag?: 'div' | 'label';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<PanelBlockContentProps>();
</script>
