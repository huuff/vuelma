<template>
<slot></slot>
</template>

<script setup lang="ts">
import { Component } from "vue";
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';
import { OptionalId } from "@/util/optional-id";

export interface BaseTabProps extends OptionalId {
  titleText: string;
  tabId?: string;
  icon?: FontAwesomeIconName
  tag?: string | Component;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<BaseTabProps>();
</script>
