<template>
  <div class="columns is-centered mt-5">
    <base-pagination
      :pageNumber="10"
      :currentPage="currentPage"
      @gotoPage="(page) => currentPage = page"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BasePagination from '@/components/pagination/BasePagination.vue';

const currentPage = ref(5);
</script>
