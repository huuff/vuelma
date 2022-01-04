<template>
<base-dropdown triggerText="Click here">
  <dropdown-item text="First" itemId="item1"/>
  <dropdown-item text="Second" itemId="item2"/>
  <dropdown-item text="Third" itemId="item3"/>
</base-dropdown>
</template>

<script setup lang="ts">
import BaseDropdown from '@/components/dropdown/BaseDropdown.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
</script>
