<template>
  <div class="modal-card">
    <header v-if="$slots.header || titleText || closeable" class="modal-card-head">
      <slot name="cardHeader"></slot>
      <p v-if="titleText" class="modal-card-title">
        {{ titleText }}
      </p>
      <button v-if="closeable"
        type="button"
        class="delete"
        aria-label="close"
        @click="emit('close')"
      ></button>
    </header>
    <section v-if="$slots.default" class="modal-card-body">
      <slot></slot>
    </section>
    <footer v-if="$slots.footer" class="modal-card-foot">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const props = withDefaults(defineProps<{
  closeable?: boolean;
  titleText?: string;
}>(), {
  closeable: true,
});

const emit = defineEmits<{
  (event: 'close'): void
}>();

const slots = useSlots();
if (slots.header && props.titleText) {
  throw new Error("Can't have both a titleText and a header in a CardModal!");
}
</script>
