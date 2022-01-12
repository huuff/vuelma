<template>
<slot></slot>
</template>

<script setup lang="ts">
import { Component } from "vue";
import { OptionalId } from "@/util/optional-id";
import { OptionalIcon } from '@/util/optional-icon';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';

export interface PanelBlockProps extends OptionalId, OptionalIcon {
  titleText: string;
  itemId?: string;
  icon?: FontAwesomeIconName;
  tag?: string | Component;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<PanelBlockProps>();
</script>
