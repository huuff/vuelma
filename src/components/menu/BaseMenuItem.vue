<template>
<li>
  <a @click="activeItem = itemId"
    :class="{ 'is-active': activeItem === itemId }"
  >{{ title }}</a>
</li>
</template>

<script setup lang="ts">
import { injectAccessors } from '@/composables/injected-accessors';

// TODO: It'd be great to default itemId to the
// value of title. I'm sure many other components would
// benefit from this default.
const props = defineProps<{
  title: string;
  itemId: string;
}>();

const activeItem = injectAccessors<string>("ActiveMenuItem");
</script>
