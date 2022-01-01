<template>
<li :class="{ 'is-active': active }">
  <a @click="emit('setActiveMenuItem', title)">
    {{ title }}
  </a>
</li>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  active?: boolean;
}>();

const emit = defineEmits<{
  (event: 'setActiveMenuItem', title: string): void;
}>();
</script>
