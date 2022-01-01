<template>
<li :class="{ 'is-active': active }">
  <a @click="emit('setActiveTab', title)">
    {{ title }}
  </a>
</li>
</template>

<script setup lang="ts">
// TODO: Test it
// TODO: Variations
// TODO: Icon
const props = defineProps<{
  title: string;
  icon?: string | [string, string]; // TODO: A type for this?
  active?: boolean;
}>();

const emit = defineEmits<{
  (event: 'setActiveTab', title: string): void;
}>();
</script>
