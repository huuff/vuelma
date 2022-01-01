<template>
<div class="is-centered mt-5 is-flex-direction-column">
  <base-message v-for="(message, i) in messages"
    class="column is-half mx-auto"
    title="Test" 
    closeable 
    :show="message.show.value" 
    :key="`message-${i}`"
    :color="message.color"
    @close="message.show.value = false"
    >
    Test content
  </base-message>
</div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { colorArray, BulmaColor } from '@/types/bulma-color';
import BaseMessage from '@/components/BaseMessage.vue';

interface ExampleMessageType {
  color: BulmaColor;
  show: Ref<boolean>;
}

const messages: ExampleMessageType[] = [];

for (let i = 0; i < colorArray.length; i++) {
  messages.push({
    color: colorArray[i],
    show: ref(true),
  });
}
</script>
