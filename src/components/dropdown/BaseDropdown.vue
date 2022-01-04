<template>
<div class="dropdown" :class="classes">
  <div class="dropdown-trigger">
    <button v-if="triggerText"
      class="button"
      aria-haspopup="true"
      :aria-controls="id"
      @click="actualOpen = !actualOpen"
      >
      <template v-if="!$slots.trigger">
        <span> {{ computedTriggerText }} </span>
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
import { useSlots, toRef, computed } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { useCloseOnClickOutside } from '@/composables/close-on-click-outside';

import DropdownItem, { DropdownItemProps } from './DropdownItem.vue';
import DropdownDivider from './DropdownDivider.vue';

import partial from 'lodash/partial';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
library.add(faAngleDown);
library.add(faAngleUp);

import { alignment } from '@/types/alignment';

// Just to have specific aria-controls
const id = Math.random().toString();

export type DropdownDirection = "up" | "down";

const props = withDefaults(defineProps<{
  triggerText?: string;
  open?: boolean;
  activeItemId?: string;
  direction?: DropdownDirection;
  asSelector?: boolean;
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
useCloseOnClickOutside(actualOpen);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actualActiveItemId = useOptionalTwoWayBinding(undefined, toRef(props, "activeItemId"), partial(emit, "update:activeItemId"));

const classes = computed(() => ({
  "is-active": actualOpen.value,
  "is-up": props.direction === "up",
  "is-right": props.alignment === "right",
  "is-left": props.alignment === "left",
}));

const icon = computed(() => {
  if (props.direction === "up")
    return "angle-up";
  else if (props.direction === "down")
    return "angle-down";
  else
    throw new Error(`No icon for direction ${props.direction}`);
});


// A better name for this class would be great
// Also I would love to have it somewhere else, but where?
// I can't export a class from a component, and it uses 
// actualActiveItemId
class DropdownItemData {
  public readonly itemId: string;
  public readonly text: string;

  constructor(props: DropdownItemProps) {
    this.text = props.text;
    this.itemId = props.itemId ?? props.text;
  }

  isActive(): boolean {
    return actualActiveItemId.value == this.itemId;
  }

  setActive(): void {
    actualActiveItemId.value = this.itemId;
  }

  render() {
    if (props.asSelector && this.isActive())
      return undefined;
    else
      return <a 
            class={classnames({
              "dropdown-item": true,
              "is-active": this.isActive(),
            })}
            onClick={() => this.setActive()}
          >{this.text}</a> 
  }
}

const slots = useSlots();
if (!!props.triggerText === !!slots.trigger) {
  throw new Error("Only one of triggerText or the 'trigger' slot must be filled in BaseDropdown!");
}

if (props.asSelector && slots.trigger) {
  throw new Error("Can't have a BaseDropdown that works as a selector with a custom trigger slot!");
}

// OPT: Items are transformed to DropdownItemData twice,
// once here (only for selectors) and once for rendering
function findActiveItem(): DropdownItemData | undefined {
  return slots.default && slots.default()
    .filter(item => item.type === DropdownItem)
    .map(item => new DropdownItemData(item.props as DropdownItemProps))
    .find(item => item.itemId === actualActiveItemId.value);
}

const computedTriggerText = computed(() => {
  if (!props.asSelector || !actualActiveItemId.value)
    return props.triggerText;
  
  const activeItem = findActiveItem();
  if (activeItem)
    return activeItem.text;
  else
    return props.triggerText;
});

const dropdownMenu = () => slots.default && slots.default().map(el => {
    if (el.type === DropdownItem) 
      return new DropdownItemData(el.props as DropdownItemProps).render();
    else if (el.type === DropdownDivider)
      return el;
    else
      return <div class="dropdown-item"> { el } </div>
  });
</script>
