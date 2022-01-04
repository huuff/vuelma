<template>
<base-dropdown triggerText="Click here">
  <dropdown-item text="First"/>
  <dropdown-item text="Second"/>
  <dropdown-item text="Third"/>
  <dropdown-divider />
  <dropdown-item text="Fourth"/>
</base-dropdown>
</template>

<script setup lang="ts">
import BaseDropdown from '@/components/dropdown/BaseDropdown.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
import DropdownDivider from '@/components/dropdown/DropdownDivider.vue';
</script>
