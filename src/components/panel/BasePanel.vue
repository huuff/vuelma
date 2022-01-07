<template>
<nav class="panel">
  <p v-if="headingText" class="panel-heading"> {{ headingText }} </p>
  <render-content />
</nav>
</template>

<script setup lang="tsx">
// TODO: Tabs
// TODO: Icons
// TODO: Content blocks
// TODO: Label blocks
import { useSlots, toRef, VNode } from "vue";
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { unwrapFragment } from "@/util/unwrap-fragment";
import PanelBlock, { PanelBlockProps } from './PanelBlock.vue';
import { getId } from '@/util/optional-id';
import partial from "lodash/partial";
import classnames from "classnames";

const props = defineProps<{
  headingText?: string;
  activeItemId?: string;
  activeTabId?: string;
}>();

const emit = defineEmits<{
  (event: "update:activeItemId", itemId?: string): void;
  (event: "update:activeTabId", tabId?: string): void;
}>();

// eslint-disable-next-line
// @ts-ignore
const actualActiveItemId = useOptionalTwoWayBinding(undefined, toRef(props, "activeItemId"), partial(emit, "update:activeItemId"));

// eslint-disable-next-line
// @ts-ignore
const actualActiveTabId = useOptionalTwoWayBinding(undefined, toRef(props, "activeTabId"), partial(emit, "update:activeTabId"));

function renderBlock(node: VNode): VNode {
  const blockProps = node.props as PanelBlockProps;
  const id = getId(blockProps);

  return <a
            class={classnames({
              "panel-block": true,
              "is-active": id === actualActiveItemId.value,
            })}
            onClick={() => actualActiveItemId.value = id}
        > { blockProps.titleText }
        </a>
            
}

const slots = useSlots();

const renderContent = () => slots.default && unwrapFragment(slots.default()).map(node => {
  if (node.type === PanelBlock) 
    return renderBlock(node);
});
</script>
