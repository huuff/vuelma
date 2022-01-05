<template>
<div class="modal" :class="{ 'is-active': actualShow }">
  <div 
    class="modal-background"
    @click="tryToCloseByBackdrop"
    ></div>

  <render></render>

  <button v-if="closeable && !isCard()"
    class="modal-close is-large"
    aria-label="close"
    @click="actualShow = false"
  ></button>
</div>
</template>

<script setup lang="tsx">
import { useSlots, computed, toRef, cloneVNode } from 'vue';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import CardModal from './CardModal.vue';
import partial from "lodash/partial";

const props = withDefaults(defineProps<{
  show?: boolean;
  closeable?: boolean;
  backdropCloseable?: boolean;
}>(), {
  show: undefined,
  closeable: true,
  backdropCloseable: undefined,
});

const emit = defineEmits<{
  (event: 'update:show', value: boolean): void
}>();

const actualShow = useOptionalTwoWayBinding(true, toRef(props, 'show'), partial(emit, "update:show"));

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


const slots = useSlots();
function isCard() {
  if (slots.default) {
    const defaultSlot = slots.default();
    return defaultSlot.length === 1 && defaultSlot[0].type === CardModal;
  } else {
    return false;
  }
}

function tryToCloseByBackdrop() {
  if (computedBackdropCloseable.value) {
    emit('update:show', false);
  }
}

const render = () => {
  if (isCard())
    return slots.default && cloneVNode(slots.default()[0], {
      onClose: () => actualShow.value = false,
      ":closeable": toRef(props, "closeable")
    });
  else
    return <div class="modal-content"> { slots.default && slots.default() } </div>
}
</script>
