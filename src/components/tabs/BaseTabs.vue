<template>
<render></render>
</template>

<script setup lang="tsx">
import { useSlots, VNode, toRef } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';
import { iconAsRender } from '@/util/fontawesome-icon-render';
import BaseTab from './BaseTab.vue';
import partial from "lodash/partial";
import classnames from "classnames";

const props = defineProps<{
  activeTabId?: string;
}>();

const emit = defineEmits<{
  (event: "update:activeTabId", tabId?: string): void;
}>();

const actualActiveTabId = useOptionalTwoWayBinding(undefined, toRef(props, "activeTabId"), partial(emit, "update:activeTabId"));

// TODO: This in another file?
class Tab {
  public readonly tabId: string;

  constructor(
    public readonly titleText: string,
    public readonly icon: FontAwesomeIconName | undefined,
    public readonly slot: VNode,
    tabId?: string,
  ) {
    this.tabId = tabId ?? titleText;
  }

  public getClasses(): string[] {
      console.log(`This id: ${this.tabId}, Current: ${actualActiveTabId.value}`)
    if (this.tabId === actualActiveTabId.value) {
      return ["is-active"]; 
    } else {
      return []
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
    child.props!.titleText,
    child.props!.icon,
    child,
    child.props!.tabId,
  ));
}

const render = () => {
  const tabs = slotToTabs();

  const activeTab = tabs.find(tab => tab.tabId === actualActiveTabId.value);

  return [
    <div class="tabs">
      <ul>
        { tabs.map(tab => 
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
        ) }
      </ul>
    </div>,
    activeTab?.slot
  ];
};
</script>
