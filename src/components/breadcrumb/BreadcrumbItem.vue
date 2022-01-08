<template>
<slot></slot>
</template>

<script setup lang="ts">
import { Component } from "vue";
import { OptionalId } from '@/util/optional-id';

export interface BreadcrumbItemProps extends OptionalId {
  tag?: string | Component;
  titleText: string;
  itemId?: string;
}

const props = defineProps<BreadcrumbItemProps>();

</script>
