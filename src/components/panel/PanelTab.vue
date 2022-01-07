<template>
<slot></slot>
</template>

<script setup lang="ts">
import { OptionalId } from '@/util/optional-id';

export interface PanelTabProps extends OptionalId {
  titleText: string;
  itemId?: string;
}

const props = defineProps<PanelTabProps>();
</script>
