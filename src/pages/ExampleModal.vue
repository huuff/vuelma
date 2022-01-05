<template>
<button 
  class="button is-primary"
  @click="showNormal = true" 
  type="button"
  >Show normal modal</button>
<base-modal
  closeable 
  v-model:show="showNormal"
  :backdropCloseable="false"
>
  <p class="has-text-white">Example modal content. This modal is not closeable by clicking on the backdrop</p>
</base-modal>
<button 
  class="button is-info mx-2"
  @click="showCard = true" 
  type="button"
  >Show card modal</button>
<base-modal 
  closeable 
  v-model:show="showCard"
  :card-title="'Example card modal'"
  >
  <card-modal title="Example card modal">
    <template #default>
      <p>Example modal content</p>
    </template>
    <template #footer>
      <p>Example modal footer</p>
    </template>
  </card-modal>
</base-modal>

<base-modal closeable class="has-text-white">
  This modal has no two-way binding. Once closed, it cannot be opened again.
</base-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseModal from '@/components/modal/BaseModal.vue';
import CardModal from '@/components/modal/CardModal.vue';

const showNormal = ref(false);
const showCard = ref(false);
</script>
