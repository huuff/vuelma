<template>
<nav :class="`panel is-${color}`">
  <p v-if="title"
    class="panel-heading"
  > {{ title }}</p>
  <slot></slot>
</nav>
</template>

<script setup lang="ts">
// TODO: Is there some way I can ensure that the slot is made of BasePanelBlocks or BasePanelTabs? (And likewise for BasePanelTabs)
import { toRef } from 'vue';
import { BulmaColor } from '@/types/bulma-color';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import partial from "lodash/partial";
import { provideAccessors } from '@/composables/injected-accessors';

const props = withDefaults(defineProps<{
  color?: BulmaColor;
  title?: string;
  activeBlock?: string;
  activeTab?: string;
}>(), {
  color: 'dark',
});

const emit = defineEmits<{
  (event: "update:activeBlock", id?: string): void;
  (event: "update:activeTab", id?: string): void;
}>();

// What's up with these errors? Seems like the compiler went crazy
const actualActiveBlock = useOptionalTwoWayBinding(undefined, toRef(props, 'activeBlock'), partial(emit, "update:activeBlock"))
provideAccessors("ActivePanelBlock", actualActiveBlock);

const actualActiveTab = useOptionalTwoWayBinding(undefined, toRef(props, 'activeTab'), partial(emit, "update:activeTab"));
provideAccessors("ActivePanelTab", actualActiveTab);

</script>
