<template>
<slot></slot>
</template>

<script setup lang="ts">
import { OptionalId } from "@/util/optional-id";
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';

export interface PanelBlockProps extends OptionalId {
  titleText: string;
  itemId?: string;
  icon?: FontAwesomeIconName;
}

const props = defineProps<PanelBlockProps>();
</script>
