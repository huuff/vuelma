<template>
<main class="container">
  <div class="is-centered mt-5 is-flex-direction-column">
    <base-message
      titleText="Two way binding message"
      closeable
      color="dark"
      v-model:show="twoWayBoundShow"
    >
      This message uses two-way binding. It can be toggled on and off from parent
    </base-message>
    <button 
      type="button"
      @click="twoWayBoundShow = !twoWayBoundShow"
      class="button is-primary mx-auto"
    >Toggle message</button>
    <hr class="my-3">
    <base-message v-for="color in colorArray"
      class="column is-half mx-auto"
      :titleText="`Message ${color}`" 
      closeable 
      :key="`message-${color}`"
      :color="color"
      >
      Test content
    </base-message>
  </div>
</main>
</template>

<script setup lang="ts">
import { ref, } from 'vue';
import { colorArray, } from '@/types/bulma-color';
import BaseMessage from '@/components/BaseMessage.vue';

const twoWayBoundShow = ref(true);
</script>
