<template>
<nav 
  class="navbar" 
  role="navigation" 
  aria-label="main navigation"
  @blur="showMobile = false"
  >
  <div class="navbar-brand">
    <classed-slot children-class="navbar-item">
      <slot name="brandItems"></slot>
    </classed-slot>
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
  <div class="navbar-start" v-if="$slots.start">
    <classed-slot children-class="navbar-item">
      <slot name="start"></slot>
    </classed-slot>
  </div>
  <div class="navbar-end" v-if="$slots.end">
    <classed-slot children-class="navbar-item">
      <slot name="end"></slot>
    </classed-slot>
  </div>
  </div>
</nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ClassedSlot from '@/components/slots/ClassedSlot';

const showMobile = ref(false);

function toggleMobileMenu() {
  showMobile.value = !showMobile.value;
  if (showMobile.value) {
    window.requestAnimationFrame(() => {
      document.addEventListener('click', () => {
          showMobile.value = false;
      }, { once: true})
    });
  }
}
</script>
