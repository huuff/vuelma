import { computed, Ref, ComputedRef } from 'vue';

export function useOptionalItemId(text: Ref<string>, id: Ref<string | undefined>): ComputedRef<string> {
  return computed(() => {
    if (id.value) {
      return id.value;
    } else {
      return text.value;
    }
  }); 
}
