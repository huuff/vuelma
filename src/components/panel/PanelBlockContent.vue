<template>
<slot></slot>
</template>

<script setup lang="ts">
// This is just a wrapper for block content

export type PanelBlockContentProps = {
  tag?: 'div' | 'label';
}

const props = defineProps<PanelBlockContentProps>();
</script>
