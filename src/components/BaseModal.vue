<template>
<div class="modal" :class="{ 'is-active': show }">
  <div 
    class="modal-background"
    @click="tryToCloseByBackdrop"
    ></div>
  <template v-if="$slots.default">
    <div class="modal-content">
      <slot></slot>
    </div>
    <button v-if="closeable"
      class="modal-close is-large"
      aria-label="close"
      @click="$emit('close')"
    ></button>
  </template>
  <template v-if="isCard()">
    <div class="modal-card">
      <header v-if="$slots.cardHeader || cardTitle || closeable" class="modal-card-head">
        <slot name="cardHeader"></slot>
        <p v-if="cardTitle" class="modal-card-title">
          {{ cardTitle }}
        </p>
        <button v-if="closeable"
          type="button"
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>
      <section v-if="$slots.cardBody" class="modal-card-body">
        <slot name="cardBody"></slot>
      </section>
      <footer v-if="$slots.cardFooter" class="modal-card-foot">
        <slot name="cardFooter"></slot>
      </footer>
    </div>
  </template>
</div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue';

const props = withDefaults(defineProps<{
  show?: boolean;
  closeable?: boolean;
  backdropCloseable?: boolean;
  cardTitle?: string;
}>(), {
  show: true,
  closeable: true,
  backdropCloseable: undefined,
});

// Sets a sensible default for backdropCloseable,
// if no value is provided, it's assumed to be
// backdropCloseable if it's closeable. Otherwise,
// we just use the provided prop
const computedBackdropCloseable = computed(() => {
  if (props.backdropCloseable === undefined) {
    return props.closeable;
  } else {
    return props.backdropCloseable;
  }
});

const emit = defineEmits<{
  (event: 'close'): void
}>();

const slots = useSlots();
function isCard() {
  return slots.cardHeader || slots.cardFooter || slots.cardBody || props.cardTitle;
}

function tryToCloseByBackdrop() {
  if (computedBackdropCloseable.value) {
    emit('close');
  }
}

if (slots.default && isCard()) {
  throw new Error('A modal can only be normal (only default slot is filled), or a card (any of cardHeader, cardBody or cardFooter filled)');
}

if (slots.cardHeader && props.cardTitle) {
  throw new Error("Can't have both a cardTitle and a cardHeader in a modal!");
}
</script>
