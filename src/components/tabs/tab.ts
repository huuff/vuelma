import { Component, VNode, WritableComputedRef } from "vue";
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';
import {OptionalIcon} from "@/util/optional-icon";

export class Tab implements OptionalIcon {
  public readonly tabId: string;

  constructor(
    public readonly titleText: string,
    public readonly icon: FontAwesomeIconName | undefined,
    public readonly slot: VNode,
    private readonly activeTabId: WritableComputedRef<string | undefined>,
    public readonly tag: string | Component | undefined,
    tabId?: string,
  ) {
    this.tabId = tabId ?? titleText;
  }

  public getClasses(): string[] {
    if (this.tabId === this.activeTabId.value) {
      return ["is-active"]; 
    } else {
      return []
    }
  }

  public setActive(): void {
    this.activeTabId.value = this.tabId;
  }

  public hasIcon(): boolean {
    return this.icon !== undefined;
  }
}

