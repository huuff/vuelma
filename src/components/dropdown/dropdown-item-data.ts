import { VNode, h, Component } from "vue";
// eslint-disable-next-line
// @ts-ignore
import { DropdownItemProps } from './DropdownItem.vue';
import { WritableComputedRef } from 'vue';
import classnames from 'classnames';

// A class that represents a dropdown item, built from its props
export class DropdownItemData {
  public readonly itemId: string;
  public readonly text: string;
  public readonly tag: string | Component;

  constructor(props: DropdownItemProps, private readonly activeItemId: WritableComputedRef<string | undefined>) {
    this.text = props.titleText;
    this.itemId = props.itemId ?? props.titleText;
    this.tag = props.tag ?? "a";
  }

  isActive(): boolean {
    return this.activeItemId.value == this.itemId;
  }

  setActive(): void {
    this.activeItemId.value = this.itemId;
  }

  render(node: VNode) {
  // eslint-disable-next-line
  // @ts-ignore
    return h(this.tag,
      {...node.props,
        class: classnames({
          "dropdown-item": true,
          "is-active": this.isActive(),
        }, node.props?.class),
        onClick: () => this.setActive(),
      },
      { default: () => this.text }
    );
  }
}

