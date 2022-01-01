<template>
<a 
  class="panel-block" 
  :class="{ 'is-active': active }"
  >
  <span v-if="icon"
    class="panel-icon"
  >
    <font-awesome-icon :icon="icon" aria-hidden="true"/>
  </span>
  <slot></slot>
</a>
</template>

<script setup lang="ts">
// TODO: Other types of panel blocks? Like label
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';

const props = defineProps<{
  icon?: FontAwesomeIconName;
  active?: boolean;
}>();
</script>
