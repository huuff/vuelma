<template>
<nav 
  class="breadcrumb"
  aria-label="breadcrumbs"
  :class="separator ? `has-${separator}-separator` : null"
>
  <ul>
    <slot></slot> 
  </ul>
</nav>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { ActiveBreadcrumbItemKey, SetActiveBreadcrumbItemKey } from './symbols';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { BreadcrumbSeparator } from '@/types/breadcrumb-separator';

const props = defineProps<{
  active?: string;
  separator?: BreadcrumbSeparator;
}>();

const emit = defineEmits<{
  (event: "update:active", itemId?: string): void;
}>();

const actualActive = useOptionalTwoWayBinding(undefined, () => props.active, (newActive) => emit("update:active", newActive));

provide(ActiveBreadcrumbItemKey, () => actualActive.value);
provide(SetActiveBreadcrumbItemKey, (itemId) => actualActive.value = itemId);
</script>
