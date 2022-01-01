<template>
<article :class="`panel is-${color}`">
  <p v-if="title"
    class="panel-heading"
  > {{ title }}</p>
</article>
</template>

<script setup lang="ts">
import { BulmaColor } from '@/types/bulma-color';

const props = withDefaults(defineProps<{
  color?: BulmaColor;
  title?: string;
}>(), {
  color: 'dark',
});
</script>
