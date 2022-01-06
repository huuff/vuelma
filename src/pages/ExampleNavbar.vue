<template>
<base-navbar>
  <template #brand>
    <navbar-item text="Navbar with dropdown" class="has-text-weight-bold is-size-5"/>
  </template>
  <template #end>
    <navbar-item v-for="num in testArray" 
      :text="num"
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
  :text="`Navbar ${color}`"
  :key="`Navbar ${color}`"
  :color="color"
  class="mb-2"
>
  <template #brand>
    <navbar-item :text="`Navbar ${color}`" class="has-text-weight-bold is-size-5" />
  </template>
  <template #end>
    <navbar-item v-for="num in testArray" 
      :text="num"
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
