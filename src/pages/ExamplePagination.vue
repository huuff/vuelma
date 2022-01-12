<template>
  <div class="column is-6 mx-auto">
    <div class="columns is-centered mt-5 is-6">
      <div class="column is-half">
        <label 
          for="pageNumber"
          class="label"
        >Items per page</label>
      </div>
    <div class="column is-half">
        <input
          type="number"
          class="input is-half"
          id="pageNumber"
          v-model="elementsPerPage"
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
  <div class="mt-5 column is-6 mx-auto">
    <paginated-slot
        :items="allItems"
        :showAround="showAround"
        :itemsPerPage="elementsPerPage"
        v-slot="{ items }"
      >
      <ul class="has-text-centered has-background-light">
        <li v-for="item in items" :key="JSON.stringify(item)">Item {{ item }}</li>
      </ul>
    </paginated-slot>
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';

import PaginatedSlot from "@/components/pagination/PaginatedSlot.vue";

const elementsPerPage = ref(10);
const showAround = ref(2);

const allItems = Array.from(Array(100).keys());
</script>
