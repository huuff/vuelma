<template>
<li :class="{ 'is-active': active }">
  <a @click="emit('setActiveTab', title)">
    <span v-if="icon" class="icon is-small">
      <font-awesome-icon :icon="icon" />
    </span>
    <span>{{ title }}</span>
  </a>
</li>
</template>

<script setup lang="ts">
// TODO: Test it
// TODO: Variations
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps<{
  title: string;
  icon?: string | [string, string]; // TODO: A type for this?
  active?: boolean;
}>();

const emit = defineEmits<{
  (event: 'setActiveTab', title: string): void;
}>();
</script>
