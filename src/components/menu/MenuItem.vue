<template>
<slot></slot>
</template>

<script setup lang="ts">
import { OptionalId } from '@/util/optional-id';

export interface MenuItemProps extends OptionalId {
  titleText: string;
  itemId?: string;
}

const props = defineProps<MenuItemProps>();
</script>
