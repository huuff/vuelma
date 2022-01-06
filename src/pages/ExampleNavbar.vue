<template>
<base-navbar>
  <template #end>
    <navbar-item v-for="num in testArray" 
      :title="`Test-${num}`"
      :key="`test-${num}`"
    />
    <navbar-dropdown triggerText="dropdown">
      <dropdown-item text="First" />
      <dropdown-item text="Second" />
      <dropdown-item text="Third" />
    </navbar-dropdown>
  </template>
</base-navbar>
</template>

<script setup lang="ts">
import BaseNavbar from '@/components/navbar/BaseNavbar.vue';
import NavbarItem from '@/components/navbar/NavbarItem.vue';
import NavbarDropdown from '@/components/navbar/NavbarDropdown.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';

const testArray = ["1", "2", "3"];
</script>
