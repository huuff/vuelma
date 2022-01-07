<template>
<div class="tabs">
  <ul>
    <tab-titles/>
  </ul>
</div>
<active-tab />
</template>

<script setup lang="tsx">
import { useSlots, toRef } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { iconAsRender } from '@/util/fontawesome-icon-render';
import { Tab } from './tab';
import BaseTab from './BaseTab.vue';
import partial from "lodash/partial";

const props = defineProps<{
  activeTabId?: string;
}>();

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
  return tabs.map(tab => 
    <li class={tab.getClasses()}>
      <a onClick={() => tab.setActive()}>
        <span > {
          !tab.hasIcon()
          ? tab.titleText
          : [
            iconAsRender(tab.icon!, [ "is-small" ]),
            <span> { tab.titleText } </span>
          ]
        } </span>
      </a>
    </li>
  )
}

const activeTab = () => slotToTabs().find(tab => tab.tabId === actualActiveTabId.value)?.slot;
</script>
