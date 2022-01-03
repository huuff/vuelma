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
import { toRef } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { BreadcrumbSeparator } from '@/types/breadcrumb-separator';
import { provideAccessors } from '@/composables/injected-accessors';
import partial from "lodash/partial";

const props = defineProps<{
  active?: string;
  separator?: BreadcrumbSeparator;
}>();

const emit = defineEmits<{
  (event: "update:active", itemId?: string): void;
}>();

const actualActive = useOptionalTwoWayBinding(undefined, toRef(props, "active"), partial(emit, "update:active"));

provideAccessors('ActiveBreadcrumbItem', actualActive);
</script>
