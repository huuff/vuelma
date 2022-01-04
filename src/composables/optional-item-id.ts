import { computed, Ref, ComputedRef } from 'vue';

export function useOptionalItemId(text: Ref<string>, id: Ref<string | undefined>): ComputedRef<string> {
  return computed(() => id.value ?? text.value); 
}
