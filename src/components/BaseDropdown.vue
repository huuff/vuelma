<template>
<div class="dropdown" :class="{ 'is-active': open }">
  <div class="dropdown-trigger">
    <button v-if="triggerText"
      class="button"
      :aria-controls="id" 
      aria-haspopup="true"
      @click="open = !open"
      @blur="open = false"
      >
      <span> {{ triggerText }} </span>
      <span class="icon is-small">
        <font-awesome-icon icon="angle-down" />
      </span>
    </button>
    <clickable-slot v-if="$slots.trigger" :fn="() => open = !open">
      <slot name="trigger"></slot>
    </clickable-slot>
  </div>
  <div class="dropdown-menu" :id="id">
    <div class="dropdown-content">
      <classed-slot :childrenClass="'dropdown-item'">
        <slot></slot>
      </classed-slot>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
// TODO: Some way to add dividers?
import { useSlots, ref } from 'vue';
import ClassedSlot from '@/components/slots/ClassedSlot';
import ClickableSlot from '@/components/slots/ClickableSlot';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDown);

const props = defineProps<{
  triggerText?: string;
}>();

const open = ref(false);

// XXX: Only for accurate aria-controls, there might be some
// better solution, but I'm unsure which one
const id = Math.random().toString();

const slots = useSlots();

if (props.triggerText && slots.trigger) {
  throw new Error("The dropdown component cannot be used with a trigger and trigger text at the same time!");
}
</script>
