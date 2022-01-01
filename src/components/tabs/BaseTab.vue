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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';

const props = defineProps<{
  title: string;
  icon?: FontAwesomeIconName;
  active?: boolean;
}>();

const emit = defineEmits<{
  (event: 'setActiveTab', title: string): void;
}>();
</script>
