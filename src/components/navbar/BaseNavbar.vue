<template>
<nav 
  :class="`navbar is-${color}`" 
  role="navigation" 
  aria-label="main navigation"
  @blur="showMobile = false"
  >
  <div class="navbar-brand">
    <slot name="brandItems"></slot>
    <a 
      role="button" 
      class="navbar-burger"
      :class="{ 'is-active': showMobile }"
      aria-label="menu"
      aria-expanded="false"
      @click="toggleMobileMenu"
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
import { provide, ref, computed } from 'vue';
import { BulmaColor } from '@/types/bulma-color';
import { provideAccessors } from '@/composables/injected-accessors';

const props = withDefaults(defineProps<{
  active?: string;
  color?: BulmaColor;
}>(), {
  color: "white",
});

const emit = defineEmits<{
  (event: "update:active", title: string): void;
}>();

const showMobile = ref(false);
const internalActive = ref<string | undefined>(undefined);

// Gets the active from prop if it exists, or from an
// internal state if it exists. Updates both the prop
// and th interal state
// TODO: What? I'm not using optionalTwoWayBinding?
const actualActive = computed({
  get: () => props.active ?? internalActive.value,
  set: (itemId: string | undefined) => {
    if (itemId) {
      internalActive.value = itemId;
      emit('update:active', itemId);
    }
  }
});

function toggleMobileMenu() {
  showMobile.value = !showMobile.value;
  if (showMobile.value) {
    requestAnimationFrame(() => {
      document.addEventListener('click', () => {
          console.log("Hiding on mobile");
          showMobile.value = false;
      }, { once: true})
    });
  }
}

provideAccessors('ActiveNavbarItem', () => actualActive.value, (id) => actualActive.value = id);
</script>
