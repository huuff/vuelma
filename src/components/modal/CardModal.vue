<template>
  <div class="modal-card">
    <header v-if="$slots.header || title || closeable" class="modal-card-head">
      <slot name="cardHeader"></slot>
      <p v-if="title" class="modal-card-title">
        {{ title }}
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
  title?: string;
}>(), {
  closeable: true,
});

const emit = defineEmits<{
  (event: 'close'): void
}>();

const slots = useSlots();
if (slots.header && props.title) {
  throw new Error("Can't have both a title and a header in a CardModal!");
}
</script>
