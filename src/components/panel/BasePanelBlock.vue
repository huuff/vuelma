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
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  icon?: string | [string, string];
  active?: boolean;
}>();
</script>
