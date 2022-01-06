<template>
<base-navbar>
  <template #end>
    <navbar-item v-for="num in testArray" 
      :title="num"
      :key="num"
    />
    <navbar-dropdown triggerText="Dropdown">
      <dropdown-item text="First" />
      <dropdown-item text="Second" />
      <dropdown-divider />
      <dropdown-item text="Third" />
    </navbar-dropdown>
  </template>
</base-navbar>
<hr class="my-5">
<base-navbar v-for="color in colorArray"
  :title="`Navbar ${color}`"
  :key="`Navbar ${color}`"
  :color="color"
  class="mb-2"
>
  <template #end>
    <navbar-item v-for="num in testArray" 
      :title="num"
      :key="num"
    />
  </template>
</base-navbar>
</template>

<script setup lang="ts">
import BaseNavbar from '@/components/navbar/BaseNavbar.vue';
import NavbarItem from '@/components/navbar/NavbarItem.vue';
import NavbarDropdown from '@/components/navbar/NavbarDropdown.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
import DropdownDivider from '@/components/dropdown/DropdownDivider.vue';
import { colorArray } from '@/types/bulma-color';

const testArray = ["First", "Second", "Third", "Fourth", "Fifth"];
</script>
