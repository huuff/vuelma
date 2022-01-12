<template>
<slot></slot>
</template>

<script setup lang="ts">
import { OptionalId } from '@/util/optional-id';

export interface PanelTabProps extends OptionalId {
  titleText: string;
  itemId?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<PanelTabProps>();
</script>
