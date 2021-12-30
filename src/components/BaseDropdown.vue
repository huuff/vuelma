<template>
<div class="dropdown">
  <div class="dropdown-trigger">
    <!-- TODO: More resilient aria-controls -->
    <button class="button" v-if="triggerText" aria-controls="dropdown-menu" aria-haspopup="true">
      {{ triggerText }}
    </button>
    <slot name="trigger"></slot>
  </div>
  <div class="dropdown-menu">
    <classed-slot :childrenClass="'dropdown-item'">
      <slot></slot>
    </classed-slot>
  </div>
</div>
</template>

<script setup lang="ts">
// TODO: Test it!
// TODO: Actual opening logic!
import { useSlots } from 'vue';
import ClassedSlot from './ClassedSlot';

const props = defineProps<{
  triggerText?: string;
}>();

const slots = useSlots();

if (props.triggerText && slots.trigger) {
  throw new Error("The dropdown component cannot be used with a trigger and trigger text at the same time!");
}
</script>
