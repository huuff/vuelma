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
        <!-- TODO: Use this to put a number of elements -->
        <input
          type="number"
          class="input is-half"
          id="pageNumber"
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
        v-model:currentPage="currentPage"
        :showAround="showAround"
        v-slot="{ items }"
      >
      <ul>
        <li v-for="item in items" :key="JSON.stringify(item)">{{item }}</li>
      </ul>
    </paginated-slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import PaginatedSlot from "@/components/pagination/PaginatedSlot.vue";
// TODO: Show this fine

const currentPage = ref(5);
const allItems = [1, 2, 3, 4, 5, 6, 7 ];
const showAround = ref(2);
</script>
