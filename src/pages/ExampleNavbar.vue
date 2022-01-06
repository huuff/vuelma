<template>
<base-navbar>
  <template #end>
    <navbar-item v-for="num in testArray" 
      :title="`Test-${num}`"
      :key="`test-${num}`"
    />
    <navbar-dropdown triggerText="Dropdown">
      <dropdown-item text="First" />
      <dropdown-item text="Second" />
      <dropdown-divider />
      <dropdown-item text="Third" />
    </navbar-dropdown>
  </template>
</base-navbar>
</template>

<script setup lang="ts">
// TODO: Showcase variants
import BaseNavbar from '@/components/navbar/BaseNavbar.vue';
import NavbarItem from '@/components/navbar/NavbarItem.vue';
import NavbarDropdown from '@/components/navbar/NavbarDropdown.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
import DropdownDivider from '@/components/dropdown/DropdownDivider.vue';

const testArray = ["1", "2", "3"];
</script>
