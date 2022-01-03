<template>
<render></render>
</template>

<script setup lang="ts">
import { useSlots, h, VNode, toRef } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';
import { iconAsRender } from '@/util/fontawesome-icon-render';
import BaseTab from './BaseTab.vue';
import partial from "lodash/partial";


const props = defineProps<{
  activeTabId?: string;
}>();

const emit = defineEmits<{
  (event: "update:activeTabId", tabId?: string): void;
}>();

const actualActiveTabId = useOptionalTwoWayBinding(undefined, toRef(props, "activeTabId"), partial(emit, "update:activeTabId"));


// TODO: Test it
class Tab {
  constructor(
    public readonly title: string,
    public readonly tabId: string,
    public readonly icon: FontAwesomeIconName | undefined,
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

  public hasIcon(): boolean {
    return this.icon !== undefined;
  }
}

const slots = useSlots();

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
    child.props!.icon,
    child,
  ));
}

const render = () => {
  const tabs = slotToTabs();

  const activeTab = tabs.find(tab => tab.tabId === actualActiveTabId.value);

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
            !tab.hasIcon()
              ? tab.title
              : [
                iconAsRender(tab.icon!, [ "is-small" ]),
                h("span", {}, tab.title),
              ]
          )
        ))
      )
    ),
    activeTab?.slot
  ];
};
</script>
