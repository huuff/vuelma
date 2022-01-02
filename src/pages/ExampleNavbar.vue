<template>
<!-- TODO: Could it work without a child element? -->
<base-navbar v-model:active="active">
  <template #brandItems>
    <base-navbar-item itemId="2wbinding">
      <a href="#">Two-Way Binding</a>
    </base-navbar-item>
  </template>
  <template #end>
    <base-navbar-item v-for="item in items"
      :itemId="item"
      :key="`twoway-${item}`"
    >
      <a href="#">{{item}}</a>
    </base-navbar-item>
  </template>
</base-navbar>
<p class="has-text-centered mb-5">The two-way binding example elements are being cycled as active by a prop from parent</p>

<hr>

<base-navbar
  v-for="color in colorArray"
  :key="`automanaged-${color}`"
  :color="color"
  class="mb-2 is-absolute"
>
  <template #brandItems>
    <base-navbar-item itemId="Automanaged">
      <a href="#">Automanaged {{color}}</a>
    </base-navbar-item>
  </template>
  <template #end>
    <base-navbar-item v-for="item in items"
      :itemId="item"
      :key="`auto-${color}-${item}`"
    >
      <a href="#">{{item}}</a>
    </base-navbar-item>
  </template>
</base-navbar>

</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import BaseNavbar from '@/components/navbar/BaseNavbar.vue';
import BaseNavbarItem from '@/components/navbar/BaseNavbarItem.vue';
import { colorArray } from '@/types/bulma-color';

const items = [ "Item 1", "Item 2", "Item 3", "Item 4" ];

const active = ref<string>(items[0]);
let autoManagedActiveIndex = 0;
const updateTwoWayBinding = setInterval(() => {
  autoManagedActiveIndex = (autoManagedActiveIndex + 1) % items.length; 
  active.value = items[autoManagedActiveIndex];
}, 2000)

onUnmounted(() => {
  clearInterval(updateTwoWayBinding);
})
</script>
