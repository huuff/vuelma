<template>
<base-dropdown triggerText="Click here">
  <dropdown-item text="First"/>
  <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
  <dropdown-item text="Third"/>
  <dropdown-divider />
  <dropdown-item text="Fourth"/>
</base-dropdown>

<selector-dropdown triggerText="Select one">
  <dropdown-item text="First"/>
  <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
  <dropdown-item text="Third"/>
  <dropdown-divider />
  <dropdown-item text="Fourth"/>
</selector-dropdown>
</template>

<script setup lang="ts">
// TODO: Showcase all variants!
import BaseDropdown from '@/components/dropdown/BaseDropdown.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
import DropdownDivider from '@/components/dropdown/DropdownDivider.vue';
import SelectorDropdown from '@/components/dropdown/SelectorDropdown.vue';
</script>
