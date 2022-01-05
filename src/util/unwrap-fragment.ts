// HACK: I'm unable to type this

import {RendererElement, RendererNode, VNode, VNodeArrayChildren, } from "vue";

type Slot = VNode<RendererNode, RendererElement, { [key: string]: any; }>[];

const errorMessage = "You put some text nodes into a slot not designed for it. Reconsider your choices";

export function unwrapFragment(defaultSlot: Slot): VNode[] | Slot {
  if (defaultSlot.length !== 1) {
    return defaultSlot;
  } else {
    const singleRootElement = defaultSlot[0];
    if (singleRootElement.type.toString() === 'Symbol(Fragment)') {
      // Probably the worst stuff I've done in my lifetime
      if (!Array.isArray(singleRootElement.children))
        throw new Error(errorMessage);
      if ((singleRootElement.children as VNodeArrayChildren).some(el => !('type' in (el as any)))) {
        throw new Error(errorMessage);
      }
      return singleRootElement.children as VNode[];
    } else {
      return defaultSlot;
    }
  }
}
