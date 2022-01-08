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
  tab?: string | Component;
}

const props = defineProps<BaseTabProps>();
</script>
