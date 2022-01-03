<template>
<render></render>
</template>

<script setup lang="ts">
import { useSlots, h, VNode, toRef } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
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

// TODO: This in an external file? But it uses the actualActiveTabId
class Tab {
  constructor(
    public readonly title: string,
    public readonly tabId: string,
    public readonly slot: VNode<any, any, any>,
  ) {}

  public getClasses(): { class: string } | Record<string, never> {
    if (this.tabId === actualActiveTabId.value) {
      return { class: "is-active"}; 
    } else {
      return {}
    }
  }

  public setActive(): void {
    actualActiveTabId.value = this.tabId;
  }
}

function slotToTabs(): Tab[] {
  const children = slots.default!();

  for (const child of children) {
    if (child.type !== BaseTab) {
      throw new Error(`All children of BaseTabs must be of type BaseTab, found ${child.type.toString()}`);
    }
  }

  return children.map(child => new Tab(
    child.props!.title,
    child.props!.tabId,
    child,
  ));
}

const render = () => {
  const tabs = slotToTabs();

  return [
    h(
      "div",
      { class: "tabs"},
      h(
        "ul",
        {},
        tabs.map(tab => h(
          "li",
          tab.getClasses(),
          h(
            "a",
            { onClick: () => tab.setActive()},
            tab.title
          )
        ))
      )
    ),
  ];
};
</script>
