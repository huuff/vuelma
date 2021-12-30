<template>
<div class="dropdown" :class="{ 'is-active': open }">
  <div class="dropdown-trigger">
    <!-- TODO: More resilient aria-controls -->
    <button v-if="triggerText"
      class="button"
      aria-controls="dropdown-menu" 
      aria-haspopup="true"
      @click="open = !open"
      @blur="open = false"
      >
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
import { useSlots, ref } from 'vue';
import ClassedSlot from './ClassedSlot';

const props = defineProps<{
  triggerText?: string;
}>();

const open = ref(false);

const slots = useSlots();

if (props.triggerText && slots.trigger) {
  throw new Error("The dropdown component cannot be used with a trigger and trigger text at the same time!");
}
</script>
