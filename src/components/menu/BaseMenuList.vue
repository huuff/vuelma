<template>
<p v-if="label"> {{ label }}</p>
<ul class="menu-list">
  <slot></slot>
</ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string;
}>();
</script>
