<template>
<slot></slot>
</template>

<script setup lang="ts">
import { OptionalId } from "@/util/optional-id";
import { OptionalIcon } from '@/util/optional-icon';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';

export interface PanelBlockProps extends OptionalId, OptionalIcon {
  titleText: string;
  itemId?: string;
  icon?: FontAwesomeIconName;
  tag?: string;
}

const props = defineProps<PanelBlockProps>();
</script>
