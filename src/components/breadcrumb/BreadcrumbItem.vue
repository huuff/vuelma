<template>
<slot></slot>
</template>

<script setup lang="ts">
import { OptionalId } from '@/util/optional-id';

export interface BreadcrumbItemProps extends OptionalId {
  tag?: string;
  titleText: string;
  itemId?: string;
}

const props = defineProps<BreadcrumbItemProps>();

</script>
