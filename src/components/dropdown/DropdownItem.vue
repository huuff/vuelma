<template>
<slot></slot>
</template>

<script setup lang="ts">
export type DropdownItemProps = {
  text: string;
  itemId?: string;
};

const props = defineProps<DropdownItemProps>();

</script>
