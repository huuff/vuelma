<template>
<render></render>
</template>

<script setup lang="ts">
import { useSlots, h, VNode } from 'vue';
import BaseTab from './BaseTab.vue';

const slots = useSlots();

interface Tab {
  title: string;
  tabId: string;
  slot: VNode<any, any, any>;
}

function slotToTabs(): Tab[] {
  const children = slots.default!();

  for (const child of children) {
    if (child.type !== BaseTab) {
      throw new Error(`All children of BaseTabs must be of type BaseTab, found ${child.type.toString()}`);
    }
  }

  return children.map(child => ({
    title: child.props!.title,
    tabId: child.props!.tabId,
    slot: child,
  }));
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
          {},
          h(
            "a",
            {},
            tab.title
          )
        ))
      )
    ),
  ];
};
</script>
