<template>
<slot></slot>
</template>

<script setup lang="ts">
import { Component } from "vue";
import { OptionalId } from '@/util/optional-id';

export interface DropdownItemProps extends OptionalId {
  titleText: string;
  itemId?: string;
  tag?: string | Component;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<DropdownItemProps>();

</script>
