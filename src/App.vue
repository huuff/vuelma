<template>
<div class="column is-2">
  <base-card :title="'Title'">
    <template #content>
      Content text
    </template>
    <template #footer>
      Footer text
    </template>
  </base-card>
</div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue';

</script>
