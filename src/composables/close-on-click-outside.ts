import { watch, Ref, WritableComputedRef } from 'vue';

export function useCloseOnClickOutside(open: Ref<boolean> | WritableComputedRef<boolean>) {
  watch(open, (newVal) => {
    if (newVal) {
      requestAnimationFrame(() => {
        document.addEventListener("click", () => {
          open.value = false;
        }, { once: true })
      });
    }
  })
}
