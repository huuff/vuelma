<template>
<slot></slot>
</template>

<script setup lang="ts">

export type MenuListProps = {
  label: string;
};

const props = defineProps<MenuListProps>();
</script>
