<template>
<slot></slot>
</template>

<script setup lang="ts">
import { OptionalId } from '@/util/optional-id';

export interface DropdownItemProps extends OptionalId {
  text: string;
  itemId?: string;
}

const props = defineProps<DropdownItemProps>();

</script>
