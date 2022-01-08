<template>
<slot></slot>
</template>

<script setup lang="ts">
import { Component } from "vue";
import { OptionalId } from '@/util/optional-id';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';

export interface BreadcrumbItemProps extends OptionalId {
  tag?: string | Component;
  titleText: string;
  itemId?: string;
  icon?: FontAwesomeIconName;
}

const props = defineProps<BreadcrumbItemProps>();

</script>
