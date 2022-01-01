<template>
<base-menu>
  <base-menu-list label="First Menu">
    <a>Elem 1</a>
    <a>Elem 2</a>
  </base-menu-list>
  <base-menu-list label="Second Menu">
    <a>Elem 1</a>
    <a class="is-active">Elem 2</a>
    <a>Elem 3</a>
    <a>Elem 4</a>
  </base-menu-list>
</base-menu>
</template>

<script setup lang="ts">
import BaseMenu from '@/components/menu/BaseMenu.vue';
import BaseMenuList from '@/components/menu/BaseMenuList.vue';


</script>
