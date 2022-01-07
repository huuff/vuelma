<template>
<main class="container">
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="column is-3-desktop mx-auto">
        <base-card :titleText="'Title'" :icon="'angle-down'">
          <template #default>
            Content text
          </template>
          <template #footerItems>
            <a href="#">item1</a>
            <a href="#">item2</a>
            <a href="#">item3</a>
          </template>
        </base-card>
      </div>
    </div>
  </div>
</main>
</template>

<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDown);
</script>
