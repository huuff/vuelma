import { 
  inject, 
  provide, 
  Ref, 
  computed, 
  WritableComputedRef,
  ComputedGetter,
  ComputedSetter,
} from 'vue';

// Future: No type safety whatsoever :(
// But it was hard achieving it for me
const getterName = (name: string) => `get${name}`;
const setterName = (name: string) => `set${name}`;


export function provideAccessors<T>(name: string, actual: Ref<T>) {
  provide(getterName(name), () => actual.value);
  provide(setterName(name), (newVal: T) => actual.value = newVal);
}

export function injectAccessors<T>(name: string): WritableComputedRef<T> {
  const getter = inject(getterName(name));
  const setter = inject(setterName(name));

  if (!getter || !setter) {
    throw new Error(`Accessors for ${name} were not provided from parent element!`);
  }

  return computed({
    get: getter as ComputedGetter<T> ,
    set: setter as ComputedSetter<T>
  }) as WritableComputedRef<T>;
}
