<template>
<base-dropdown
  v-model:open="actualOpen"
  v-model:activeItemId="actualActiveItemId"
  :triggerText="actualTriggerText"
  :direction="direction"
  :alignment="alignment"
>
  <slot></slot>
</base-dropdown>
</template>

<script setup lang="ts">
import { toRef, useSlots, computed } from "vue";
import BaseDropdown, { DropdownDirection } from "./BaseDropdown.vue";
import { alignment } from '@/types/alignment';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { useCloseOnClickOutside } from '@/composables/close-on-click-outside';
import DropdownItem, { DropdownItemProps } from '@/components/dropdown/DropdownItem.vue';
import partial from "lodash/partial";
import { DropdownItemData } from './dropdown-item-data';

const props = withDefaults(defineProps<{
  triggerText: string;
  open?: boolean;
  activeItemId?: string;
  direction?: DropdownDirection;
  alignment?: alignment;
}>(), {
  open: undefined,
  direction: "down",
  alignment: "center",
});

const emit = defineEmits<{
  (event: "update:open", value: boolean): void;
  (event: "update:activeItemId", value?: string): void;
}>();

// XXX: I don't know what's up with these errors, seems like
// the vue compiler went crazy. But it works anyway
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actualOpen = useOptionalTwoWayBinding(false, toRef(props, "open"), partial(emit, "update:open"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
useCloseOnClickOutside(actualOpen);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actualActiveItemId = useOptionalTwoWayBinding(undefined, toRef(props, "activeItemId"), partial(emit, "update:activeItemId"));

const slots = useSlots();
function findActiveItem(): DropdownItemData | undefined {
  return slots.default && slots.default()
    .filter(item => item.type === DropdownItem)
    .map(item => new DropdownItemData(item.props as DropdownItemProps, actualActiveItemId))
    .find(item => item.itemId === actualActiveItemId.value);
}

const actualTriggerText = computed(() => {
  if (!actualActiveItemId.value)
    return props.triggerText;
  else {
    return findActiveItem()?.text ?? props.triggerText;
  }
});
</script>
