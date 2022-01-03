import { inject, provide, Ref } from 'vue';

// Future: No type safety whatsoever :(
// But it was hard achieving it for me
// TODO: Maybe use a ref for the getter (for setter too?)
// TODO: Actual accessor? With a `value` property or smth
const getterName = (name: string) => `get${name}`;
const setterName = (name: string) => `set${name}`;


export function provideAccessors<T>(name: string, getter: Ref<T>, setter: (newVal: T) => void): void {
  provide(getterName(name), () => getter.value);
  provide(setterName(name), setter);
}

export function provideAccessorsFromOptionalTwoWayBinding<T>(name: string, actual: Ref<T>) {
  provide(getterName(name), () => actual.value);
  provide(setterName(name), (newVal: T) => actual.value = newVal);
}

type InjectedAccessors<T> = {
  get: () => T;
  set: (newVal: T) => void;
};

export function injectAccessors<T>(name: string): InjectedAccessors<T> {
  const getter = inject(getterName(name));
  const setter = inject(setterName(name));

  if (!getter || !setter) {
    throw new Error(`Accessors for ${name} were not provided from parent element!`);
  }

  return {
    get: getter,
    set: setter,
  } as InjectedAccessors<T>;
}
