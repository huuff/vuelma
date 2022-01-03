<template>
<p v-if="label" class="menu-label"> {{ label }}</p>
<ul class="menu-list">
  <slot></slot>
</ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string;
}>();
</script>
