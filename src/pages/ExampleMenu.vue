<template>
<div class="columns is-centered mt-3">
  <div class="column is-3-desktop">
  <base-menu>
    <base-menu-list label="First Menu">
      <base-menu-item title="Elem 1" />
      <base-menu-item title="Elem 2" />
    </base-menu-list>
    <base-menu-list label="Second Menu">
      <base-menu-item title="Elem 3" />
      <base-menu-item title="Elem 4" />
      <base-menu-item title="Elem 5" />
    </base-menu-list>
  </base-menu>
  </div>
</div>
</template>

<script setup lang="ts">
import BaseMenu from '@/components/menu/BaseMenu.vue';
import BaseMenuList from '@/components/menu/BaseMenuList.vue';
import BaseMenuItem from '@/components/menu/BaseMenuItem.vue';

</script>
