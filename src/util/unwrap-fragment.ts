import {RendererElement, RendererNode, VNode, VNodeArrayChildren, } from "vue";

// HACK: This is seriously horrible and I don't know who to blame
// Vue internals types are impractical?
// I don't know about Vue internals well enough?
// I don't know TypeScript?
// It's unlikely I'll ever fix this. It's flaky and wrong but didn't break any tests.

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
