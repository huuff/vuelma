<template>
<nav class="panel" :class="{
  [`is-${color}`]: color,
}">
  <p v-if="headingText" class="panel-heading"> {{ headingText }} </p>
  <render-content />
</nav>
</template>

<script setup lang="ts">
import { useSlots, toRef, VNode, Slots, h, onUpdated } from "vue";
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { unwrapFragment } from "@/util/unwrap-fragment";
import PanelBlock, { PanelBlockProps } from './PanelBlock.vue';
import PanelTab, { PanelTabProps } from './PanelTab.vue';
import PanelTabs from './PanelTabs.vue';
import PanelBlockContent, { PanelBlockContentProps } from './PanelBlockContent.vue';
import { getId } from '@/util/optional-id';
import { renderOptionalIcon } from "@/util/optional-icon";
import { BulmaColor } from '@/types/bulma-color';
import partial from "lodash/partial";
import classnames from "classnames";

export interface BasePanelProps {
  headingText?: string;
  activeItemId?: string;
  activeTabId?: string;
  color?: BulmaColor;
}

const props = defineProps<BasePanelProps>();

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

// Normal block, just an anchor
function renderBlockItem(node: VNode): VNode {
  const blockProps = node.props as PanelBlockProps;
  const id = getId(blockProps);

  return h(blockProps.tag ?? "a",
    { ...blockProps,
      class: classnames({
        "panel-block": true,
        "is-active": id == actualActiveItemId.value
      }, node.props?.class),
      onClick: () => actualActiveItemId.value = id,
    },
    renderOptionalIcon(blockProps, [ "panel-icon" ])
  ) 
}

function renderBlockContent(node: VNode): VNode {
  const contentSlot = (node.children as Slots).default;
  const blockProps = (node.props ?? {}) as PanelBlockContentProps;

  return h(blockProps.tag ?? "div",
    { ...node.props,
      class: classnames("panel-block", node.props?.class)
    },
    {
      default: () => contentSlot && contentSlot(),
    }
  )
}

function renderBlock(node: VNode): VNode {
  if (node.type === PanelBlock)
    return renderBlockItem(node);
  else if (node.type === PanelBlockContent)
    return renderBlockContent(node);
  else {
    throw new Error("The child of a PanelTab or a free child of a BasePanel must be a PanelBlock or a PanelBlockContent!");
  }
}

function renderTabContents(node: VNode | undefined): VNode[] {
  if (!node)
    return [];

  const tabSlot = (node.children as Slots).default;
  const items = tabSlot && unwrapFragment(tabSlot());


  if (!Array.isArray(items)) {
    throw new Error("The children of a PanelTab must be PanelBlocks or PanelBlockContents!");
  }

  return items.map(renderBlock);
}

function renderTabs(node: VNode): VNode[] {
  if (!node.children) {
    return [];
  }
  const tabsSlot = (node.children as Slots).default;
  const items = tabsSlot && tabsSlot(); 
  
  if (!Array.isArray(items) || items.some(el => el.type !== PanelTab)) {
    throw new Error("The children of `PanelTabs` must be `PanelTab`!");
  }

  const itemsProps = items.map(item => item.props as PanelTabProps);
  const activeTab = items.find(item => getId(item.props as PanelTabProps) === actualActiveTabId.value);

  return [
    h(
      "p",
      { class: "panel-tabs", },
      itemsProps.map(item => h(
        // eslint-disable-next-line
        // @ts-ignore
        item.tag ?? "a",
        { ...item,
          class: classnames({ "is-active": getId(item) === actualActiveTabId.value}),
          onClick: () => actualActiveTabId.value = getId(item),
        },
        item.titleText
      ))
    ),
    ...renderTabContents(activeTab)
  ];
}

const slots = useSlots();
const renderContent = () => slots.default && unwrapFragment(slots.default()).map(node => {
  if (node.type === PanelTabs)
    return renderTabs(node);
  else
    return renderBlock(node);
});

onUpdated(() => {
  if (slots.default && unwrapFragment(slots.default()).filter(node => node.type === PanelTabs).length > 1)
    throw new Error("A BasePanel can only have a maximum of 1 PanelTabs!")
});
</script>
