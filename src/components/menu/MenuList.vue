<template>
<slot></slot>
</template>

<script setup lang="ts">

export type MenuListProps = {
  label: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<MenuListProps>();
</script>
