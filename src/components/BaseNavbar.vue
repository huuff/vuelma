<template>
<nav 
  class="navbar" 
  role="navigation" 
  aria-label="main navigation"
  @blur="showMobile = false"
  >
  <div class="navbar-brand" @setActiveNavbarItem="setActiveNavbarItem">
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
    @setActiveNavbarItem="setActiveNavbarItem"
  >
    <slot name="start"></slot>
  </div>
  <div v-if="$slots.end"
    class="navbar-end"
    @setActiveNavbarItem="setActiveNavbarItem"
  >
    <slot name="end"></slot>
  </div>
  </div>
</nav>
</template>

<script setup lang="ts">
// TODO: A NavBar example that showcases using two-way binding and internal state automanagement
// TODO: Put navbar stuff into their own folder
import { provide, ref, computed } from 'vue';

const props = defineProps<{
  active?: string
}>();

const emit = defineEmits<{
  (event: "update:active", title: string): void;
}>();

const showMobile = ref(false);

const internalActive = ref<string | undefined>(undefined);
const actualActive = computed({
  get: () => props.active ?? internalActive.value,
  set: (title: string | undefined) => {
    if (title) {
      internalActive.value = title;
      emit('update:active', title);
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

function setActiveNavbarItem(title: string): void {
  console.log(`Setting as active: ${title}`)
}

provide('setActiveNavbarItem', (title: string) => actualActive.value = title);
provide('activeNavbarItem', () => actualActive.value);
</script>
