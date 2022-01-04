<template>
<div class="dropdown" :class="{ 'is-active': actualOpen }">
  <div class="dropdown-trigger">
    <button v-if="triggerText"
      class="button"
      aria-haspopup="true"
      @click="actualOpen = !actualOpen"
      @blur="actualOpen = false"
      >
      <template v-if="!$slots.trigger">
        <span> {{ triggerText }} </span>
        <span class="icon is-small">
          <font-awesome-icon icon="angle-down" />
        </span>
      </template>
      <template v-else>
        <slot name="trigger"></slot>
      </template>
    </button>
  </div>
  <div class="dropdown-menu">
    <div class="dropdown-content">
      <classed-slot :childrenClass="'dropdown-item'">
        <slot></slot>
      </classed-slot>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
// TODO: aria-controls
import { useSlots, toRef } from 'vue';
import ClassedSlot from '@/components/slots/ClassedSlot';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import partial from 'lodash/partial';

library.add(faAngleDown);

const props = withDefaults(defineProps<{
  triggerText?: string;
  open?: boolean;
}>(), {
  open: undefined,
});

const emit = defineEmits<{
  (event: "update:open", value: boolean): void
}>();

const actualOpen = useOptionalTwoWayBinding(false, toRef(props, "open"), partial(emit, "update:open"));

const slots = useSlots();
if (!!props.triggerText === !!slots.trigger) {
  throw new Error("Only one of triggerText or the 'trigger' slot must be filled in!");
}
</script>
