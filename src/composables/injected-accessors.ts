import { inject, provide, } from 'vue';

// Future: No type safety whatsoever :(
// But it was hard achieving it for me
// TODO: Maybe use a ref for the getter (for setter too?)
// TODO: Actual accessor? With a `value` property or smth
// TODO: Autoprovide passing just actual for optionalTwoWayBinding
export function provideAccessors<T>(name: string, getter: () => T, setter: (newVal: T) => void): void {
  provide(`get${name}`, getter);
  provide(`set${name}`, setter);
}

type InjectedAccessors<T> = {
  get: () => T;
  set: (newVal: T) => void;
};

export function injectAccessors<T>(name: string): InjectedAccessors<T> {
  const getter = inject(`get${name}`);
  const setter = inject(`set${name}`);

  if (!getter || !setter) {
    throw new Error(`Accessors for ${name} were not provided from parent element!`);
  }

  return {
    get: getter,
    set: setter,
  } as InjectedAccessors<T>;
}
