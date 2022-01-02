import { ref, computed, UnwrapRef } from 'vue';

// Returns a computed value that uses the provided state
// (and notifies of changes), or, uses an internal one if none
// is provided. Params:
// defaultValue: For the internal state, if none is provided
// fromProps: Get the provided state, or undefined if there is none
// emitUpdate: An emit, for notifying parent of state changes (if state was provided)
export function useOptionalTwoWayBinding<T>(defaultValue: T, fromProps: () => (T | undefined), emitUpdate: (newVal: T) => void) {
  const internal = ref(defaultValue);

  // XXX: Why so many casts?
  // Check https://github.com/vuejs/vue-next/issues/1324
  return computed({
    get: () => fromProps() ?? internal.value as T,
    set: (newVal: T) => {
      internal.value = newVal as UnwrapRef<T>;
      emitUpdate(newVal);
    }
  })
}
