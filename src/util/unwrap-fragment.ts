import {VNode, VNodeArrayChildren, } from "vue";

const errorMessage = "You put some text nodes into a slot not designed for it. Reconsider your choices";

export function unwrapFragment(node: VNode[]): VNode[] {
  if (node.length !== 1) {
    return node;
  } else {
    const singleRootElement = node[0];
    if (singleRootElement.type.toString() === "Symbol(Fragment)") {
      const children = singleRootElement.children;
      if (!isNodeArray(children))
        throw new Error(errorMessage);
      if (children.some(el => !isVNode(el))) {
        throw new Error(errorMessage);
      }
      return unwrapFragment(singleRootElement.children as VNode[]);
    } else {
      return node;
    }
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNodeArray(children: any): children is VNodeArrayChildren {
  return Array.isArray(children);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isVNode(obj: any): obj is VNode {
  return obj.type !== undefined;
}
