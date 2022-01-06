<template>
<slot></slot>
</template>

<script setup lang="ts">
import { Component } from 'vue';

export type NavbarItemProps = {
  tag?: string | Component;
  title: string;
  itemId?: string;
};

const props =defineProps<NavbarItemProps>();

</script>
