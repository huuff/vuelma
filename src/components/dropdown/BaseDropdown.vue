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
    <div class="dropdown-content">
      <dropdown-menu></dropdown-menu>
    </div>
  </div>
</div>
</template>

<script setup lang="tsx">
// TODO: aria-controls
// TODO: dropup
// TODO: as selector
import { useSlots, toRef, VNode } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { useCloseOnClickOutside } from '@/composables/close-on-click-outside';

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

// XXX: I don't know what's up with these errors, seems like
// the vue compiler went crazy. But it works anyway
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actualOpen = useOptionalTwoWayBinding(false, toRef(props, "open"), partial(emit, "update:open"));
useCloseOnClickOutside(actualOpen);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actualActiveItemId = useOptionalTwoWayBinding(undefined, toRef(props, "activeItemId"), partial(emit, "update:activeItemId"));

const slots = useSlots();
if (!!props.triggerText === !!slots.trigger) {
  throw new Error("Only one of triggerText or the 'trigger' slot must be filled in!");
}

// A better name for this class would be great
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
    return <a 
          class={classnames({
            "dropdown-item": true,
            "is-active": this.isActive(),
          })}
          onClick={() => this.setActive()}
        >{this.text}</a> 

  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderDropdownContent(el: VNode<any, any, any>) {
  return <div class="dropdown-item"> { el } </div>
}

const dropdownMenu = () => slots.default && slots.default().map(el => {
    if (el.type === DropdownItem) 
      return new DropdownItemData(el.props as DropdownItemProps).render();
    else if (el.type === DropdownDivider)
      return el;
    else
      return renderDropdownContent(el);
  });
</script>
