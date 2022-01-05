<template>
<nav 
  :class="`navbar is-${color}`" 
  role="navigation" 
  aria-label="main navigation"
  >
  <div class="navbar-brand">
    <slot name="brandItems"></slot>
    <a 
      role="button" 
      class="navbar-burger"
      :class="{ 'is-active': showMobile }"
      aria-label="menu"
      aria-expanded="false"
      @click="showMobile = true"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div 
    class="navbar-menu"
    :class="{ 'is-active': showMobile }"
  >
  <div v-if="$slots.start"
    class="navbar-start"
  >
    <slot name="start"></slot>
  </div>
  <div v-if="$slots.end"
    class="navbar-end"
  >
    <slot name="end"></slot>
  </div>
  </div>
</nav>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import { BulmaColor } from '@/types/bulma-color';
import { provideAccessors } from '@/composables/injected-accessors';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { useCloseOnClickOutside } from '@/composables/close-on-click-outside';
import partial from 'lodash/partial';

const props = withDefaults(defineProps<{
  active?: string;
  color?: BulmaColor;
}>(), {
  color: "white",
});

const emit = defineEmits<{
  (event: "update:active", id?: string): void;
}>();

const showMobile = ref(false);
useCloseOnClickOutside(showMobile);

const actualActive = useOptionalTwoWayBinding<string | undefined>(undefined, toRef(props, "active"), partial(emit, 'update:active'));

provideAccessors('ActiveNavbarItem', actualActive);
</script>
