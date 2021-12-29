<template>
  <div class="column is-3 is-3-desktop">
    <base-card :title="'Title'" :icon="'angle-down'">
      <template #content>
        Content text
      </template>
      <template #footerItems>
        <a href="#">item1</a>
        <a href="#">item2</a>
        <a href="#">item3</a>
      </template>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDown);
</script>
