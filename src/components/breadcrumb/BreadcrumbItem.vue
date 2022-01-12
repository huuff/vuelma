<template>
<slot></slot>
</template>

<script setup lang="ts">
import { Component } from "vue";
import { OptionalId } from '@/util/optional-id';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';
import { OptionalIcon } from '@/util/optional-icon';

export interface BreadcrumbItemProps extends OptionalId, OptionalIcon {
  tag?: string | Component;
  titleText: string;
  itemId?: string;
  icon?: FontAwesomeIconName;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<BreadcrumbItemProps>();

</script>
