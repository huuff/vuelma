<template>
<div class="column is-3 is-centered">
  <base-message 
    title="test" 
    closeable 
    :show="show" 
    :color="'primary'"
    @close="show = false"
    >
    Test content
  </base-message>
</div>
</template>

<script setup lang="ts">
// TODO: Showcase it with different colors with a v-for
import { ref } from 'vue';
import BaseMessage from '@/components/BaseMessage.vue';

const show = ref(true);
</script>
