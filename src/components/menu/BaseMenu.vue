<template>
<aside class="menu">
  <slot></slot>
</aside>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { provideAccessors } from '@/composables/injected-accessors';
import partial from "lodash/partial";

const props = defineProps<{
  activeItem?: string;
}>();

const emit = defineEmits<{
  (event: "update:activeItem", id?: string): void
}>();

const actualActiveItem = useOptionalTwoWayBinding(undefined, toRef(props, 'activeItem'), partial(emit, "update:activeItem"));
provideAccessors("ActiveMenuItem", actualActiveItem);

</script>
