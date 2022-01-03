<template>
  <div class="column is-6 mx-auto">
    <div class="columns is-centered mt-5 is-6">
      <div class="column is-half">
        <label 
          for="pageNumber"
          class="label"
        >Number of pages</label>
      </div>
      <div class="column is-half">
        <input
          type="number"
          class="input is-half"
          id="pageNumber"
          v-model="pageNumber"
        />
      </div>
    </div>
    <div class="columns is-centered is-6">
      <div class="column is-half">
        <label 
          class="label"
          for="showAround"
        >Show around</label>
      </div>
      <div class="column is-half">
        <input
          type="number"
          id="showAround"
          class="input is-half"
          v-model="showAround"
        />
      </div>
    </div>
  </div>
  <div class="columns is-centered mt-5">
    <base-pagination
      :pageNumber="pageNumber"
      v-model:currentPage="currentPage"
      :showAround="showAround"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BasePagination from '@/components/pagination/BasePagination.vue';

const currentPage = ref(5);
const pageNumber = ref(10);
const showAround = ref(2);
</script>
