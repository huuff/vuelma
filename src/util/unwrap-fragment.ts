import {VNode, VNodeArrayChildren, } from "vue";

// HACK: This is seriously horrible and I don't know who to blame
// Vue internals types are impractical?
// I don't know about Vue internals well enough?
// I don't know TypeScript?
// It's unlikely I'll ever fix this. It's flaky and wrong but didn't break any tests.

const errorMessage = "You put some text nodes into a slot not designed for it. Reconsider your choices";

export function unwrapFragment(node: VNode[]): VNode[] {
  if (node.length !== 1) {
    return node;
  } else {
    const singleRootElement = node[0];
    if (singleRootElement.type.toString() === 'Symbol(Fragment)') {
      // Probably the worst stuff I've done in my lifetime
      if (!Array.isArray(singleRootElement.children))
        throw new Error(errorMessage);
      if ((singleRootElement.children as VNodeArrayChildren).some(el => !('type' in (el as any)))) { // TODO: As a type assertion?
        throw new Error(errorMessage);
      }
      return unwrapFragment(singleRootElement.children as VNode[]);
    } else {
      return node;
    }
  }
}
