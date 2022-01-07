import { h, Component, VNode, WritableComputedRef, Ref } from "vue";
import { OptionalId, getId } from "@/util/optional-id";
import classnames from "classnames";

export function renderNavbarItem(
    tag: string | Component,
    node: VNode,
    activeItem: Ref<string> | WritableComputedRef<string>,
    item: OptionalId,
): VNode {
    // HACK: I don't know where this error comes from.
    // I've checked the overloads and it exists.
    // Also, it works just fine
    // eslint-disable-next-line
    // @ts-ignore
    return h(tag,
      { ...item,
        class: classnames({
          "navbar-item": true,
          "is-active": activeItem.value === getId(item),
        }, node.props?.class),
        onClick: () => activeItem.value = getId(item),
      },
      { default: () => item.titleText }
    );
}
