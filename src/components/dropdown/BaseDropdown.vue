<template>
<div class="dropdown" :class="{ 'is-active': actualOpen }">
  <div class="dropdown-trigger">
    <button v-if="triggerText"
      class="button"
      aria-haspopup="true"
      @click="actualOpen = !actualOpen"
      >
      <template v-if="!$slots.trigger">
        <span> {{ triggerText }} </span>
        <span class="icon is-small">
          <font-awesome-icon icon="angle-down" />
        </span>
      </template>
      <template v-else>
        <slot name="trigger"></slot>
      </template>
    </button>
  </div>
  <div class="dropdown-menu">
    <dropdownContent></dropdownContent>
  </div>
</div>
</template>

<script setup lang="tsx">
// TODO: aria-controls
import { useSlots, toRef, } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';

import DropdownItem, { DropdownItemProps } from './DropdownItem.vue';
import DropdownDivider from './DropdownDivider.vue';


import partial from 'lodash/partial';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
library.add(faAngleDown);

const props = withDefaults(defineProps<{
  triggerText?: string;
  open?: boolean;
  activeItemId?: string;
}>(), {
  open: undefined,
});

const emit = defineEmits<{
  (event: "update:open", value: boolean): void;
  (event: "update:activeItemId", value?: string): void;
}>();

// XXX: I don't know what's up with these issues, seems like
// the vue compiler went crazy. But it works anyway
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actualOpen = useOptionalTwoWayBinding(false, toRef(props, "open"), partial(emit, "update:open"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actualActiveItemId = useOptionalTwoWayBinding(undefined, toRef(props, "activeItemId"), partial(emit, "update:activeItemId"));

const slots = useSlots();
if (!!props.triggerText === !!slots.trigger) {
  throw new Error("Only one of triggerText or the 'trigger' slot must be filled in!");
}

function isActive(itemId: string): boolean {
  return actualActiveItemId.value === itemId;
}

function setActive(itemId: string): void {
  actualActiveItemId.value = itemId;
  actualOpen.value = false;
}

function getItemId(props: DropdownItemProps) {
  return props.itemId ?? props.text;
}

function renderDropdownItem(itemProps: DropdownItemProps) {
  return <a 
          class={classnames({
            "dropdown-item": true,
            "is-active": isActive(getItemId(itemProps)),
          })}
          onClick={() => setActive(getItemId(itemProps))}
        >{itemProps.text}</a> 
}

const dropdownContent = () => 
<div class="dropdown-content">
  { slots.default && slots.default().map(el => {
    if (el.type === DropdownItem) 
      return renderDropdownItem(el.props as DropdownItemProps);
    else if (el.type === DropdownDivider)
      return el;
  })}
</div>
</script>
