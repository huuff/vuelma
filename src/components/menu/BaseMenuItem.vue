<template>
<li :class="{ 'is-active': active }">
  <a @click="emit('setActiveMenu', title)">
    {{ title }}
  </a>
</li>
</template>

<script setup lang="ts">
// TODO: Test it
const props = defineProps<{
  title: string;
  active?: boolean;
}>();

const emit = defineEmits<{
  (event: 'setActiveMenu', title: string): void;
}>();
</script>
