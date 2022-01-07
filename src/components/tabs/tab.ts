import { VNode, WritableComputedRef } from "vue";
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';

export class Tab {
  public readonly tabId: string;

  constructor(
    public readonly titleText: string,
    public readonly icon: FontAwesomeIconName | undefined,
    public readonly slot: VNode,
    private readonly activeTabId: WritableComputedRef<string | undefined>,
    tabId?: string,
  ) {
    this.tabId = tabId ?? titleText;
  }

  public getClasses(): string[] {
      console.log(`This id: ${this.tabId}, Current: ${this.activeTabId.value}`)
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

