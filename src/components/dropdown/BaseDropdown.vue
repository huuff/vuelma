<template>
<div class="dropdown" :class="classes">
  <div class="dropdown-trigger">
    <button v-if="triggerText"
      class="button"
      :class="{
        [`is-${color}`]: color
      }"
      aria-haspopup="true"
      :aria-controls="id"
      @click="actualOpen = !actualOpen"
      >
      <template v-if="!$slots.trigger">
        <span> {{ triggerText }} </span>
        <span class="icon is-small">
          <font-awesome-icon :icon="icon" />
        </span>
      </template>
      <template v-else>
        <slot name="trigger"></slot>
      </template>
    </button>
  </div>
  <div class="dropdown-menu" id="id">
    <div class="dropdown-content">
      <dropdown-menu></dropdown-menu>
    </div>
  </div>
</div>
</template>

<script setup lang="tsx">
import { useSlots, toRef, computed, } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { useCloseOnClickOutside } from '@/composables/close-on-click-outside';

import DropdownItem, { DropdownItemProps } from './DropdownItem.vue';
import DropdownDivider from './DropdownDivider.vue';

import partial from 'lodash/partial';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
library.add(faAngleDown);
library.add(faAngleUp);

import { Alignment } from '@/types/alignment';
import { unwrapFragment } from '@/util/unwrap-fragment';
import { DropdownItemData } from './dropdown-item-data';
import {BulmaColor} from '@/types/bulma-color';

// Just to have specific aria-controls
const id = Math.random().toString();

export type DropdownDirection = "up" | "down";

const props = withDefaults(defineProps<{
  triggerText: string;
  open?: boolean;
  activeItemId?: string;
  direction?: DropdownDirection;
  alignment?: Alignment;
  hoverable?: boolean;
  color?: BulmaColor
}>(), {
  open: undefined,
  direction: "down",
  alignment: "center",
});

const emit = defineEmits<{
  (event: "update:open", value: boolean): void;
  (event: "update:activeItemId", value?: string): void;
}>();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actualOpen = useOptionalTwoWayBinding(false, toRef(props, "open"), partial(emit, "update:open"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
useCloseOnClickOutside(actualOpen);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actualActiveItemId = useOptionalTwoWayBinding(undefined, toRef(props, "activeItemId"), partial(emit, "update:activeItemId"));

const classes = computed(() => ({
  "is-active": actualOpen.value,
  "is-up": props.direction === "up",
  "is-right": props.alignment === "right",
  "is-left": props.alignment === "left",
  "is-hoverable": props.hoverable,
}));

const icon = computed(() => {
  if (props.direction === "up")
    return "angle-up";
  else if (props.direction === "down")
    return "angle-down";
  else
    throw new Error(`No icon for direction ${props.direction}`);
});


const slots = useSlots();
if (!!props.triggerText === !!slots.trigger) {
  throw new Error("Exactly one of triggerText or the 'trigger' slot must be filled in BaseDropdown!");
}

const dropdownMenu = () => slots.default && unwrapFragment(slots.default()).map(el => {
    if (el.type === DropdownItem) 
      return new DropdownItemData(el.props as DropdownItemProps, actualActiveItemId).render(el);
    else if (el.type === DropdownDivider)
      return <hr class="dropdown-divider"/>;
    else
      return <div class="dropdown-item"> { el } </div>
  });
</script>
