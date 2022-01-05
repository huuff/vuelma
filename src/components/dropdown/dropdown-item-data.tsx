// eslint-disable-next-line
// @ts-ignore
import { DropdownItemProps } from './DropdownItem.vue';
import { WritableComputedRef } from 'vue';
import classnames from 'classnames';

// A class that represents a dropdown item, built from its props
export class DropdownItemData {
  public readonly itemId: string;
  public readonly text: string;

  constructor(props: DropdownItemProps, private readonly activeItemId: WritableComputedRef<string | undefined>) {
    this.text = props.text;
    this.itemId = props.itemId ?? props.text;
  }

  isActive(): boolean {
    return this.activeItemId.value == this.itemId;
  }

  setActive(): void {
    this.activeItemId.value = this.itemId;
  }

  render() {
    return <a 
          class={classnames({
            "dropdown-item": true,
            "is-active": this.isActive(),
          })}
          onClick={() => this.setActive()}
        >{this.text}</a> 
  }
}

