import { VueWrapper } from "@vue/test-utils";

export function getFirstEmission<T>(wrapper: VueWrapper, eventName: string): T {
  return (wrapper.emitted()[eventName][0] as T[])[0];
}

export function emittedHide(wrapper: VueWrapper): boolean {
  return Object.keys(wrapper.emitted()).includes("update:show")
    && getFirstEmission(wrapper, "update:show") === false;
}
