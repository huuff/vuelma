<template>
<div class="tabs" :class="{
  [`is-${tabStyle}`]: tabStyle,
  [`is-${alignment}`]: alignment !== 'left',
}">
  <ul>
    <tab-titles/>
  </ul>
</div>
<active-tab />
</template>

<script setup lang="ts">
import { useSlots, toRef, h } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { Tab } from './tab';
import BaseTab from './BaseTab.vue';
import partial from "lodash/partial";
import { Alignment } from '@/types/alignment';
import { renderOptionalIcon } from '@/util/optional-icon';

export type TabStyle = "boxed" | "toggle" | "toggle-rounded";

const props = withDefaults(defineProps<{
  activeTabId?: string;
  tabStyle?: TabStyle;
  alignment?: Alignment;
}>(), {
  alignment: "left",
});

const emit = defineEmits<{
  (event: "update:activeTabId", tabId?: string): void;
}>();

const actualActiveTabId = useOptionalTwoWayBinding(undefined, toRef(props, "activeTabId"), partial(emit, "update:activeTabId"));

const slots = useSlots();

function slotToTabs(): Tab[] {
  const children = slots.default!();

  for (const child of children) {
    if (child.type !== BaseTab) {
      throw new Error(`All children of BaseTabs must be of type BaseTab, found ${child.type.toString()}`);
    }
  }

  return children.map(child => new Tab(
    child.props!.titleText,
    child.props!.icon,
    child,
    actualActiveTabId,
    child.props!.tabId,
  ));
}

const tabTitles = () => {
  const tabs = slotToTabs();

  return tabs.map(tab => h(
    "li",
    {
      class: tab.getClasses().join(" "),
    },
    h(
        "a", // TODO: Custom tags?
        { onClick: () => tab.setActive() },
        { default: () => renderOptionalIcon(tab, [ "is-small" ]) }
    )
  ));
}

const activeTab = () => slotToTabs().find(tab => tab.tabId === actualActiveTabId.value)?.slot;
</script>
