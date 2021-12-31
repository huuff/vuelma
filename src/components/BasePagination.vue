<template>
<nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous">Previous</a>
  <a class="pagination-next">Next</a>
  <ul class="pagination-list">
    <base-pagination-link :pageNumber="1" :currentPage="currentPage"/>
    
    <base-pagination-link v-if="pageNumber !== 0"
      :pageNumber="pageNumber"
      :currentPage="currentPage"
    />
  </ul>
</nav>
</template>

<script setup lang="ts">
// TODO: Icons for previous and next?
import BasePaginationLink from '@/components/BasePaginationLink.vue';

const props = withDefaults(defineProps<{
  pageNumber: number;
  currentPage: number;
  showAround?: number;
}>(), {
  showAround: 2,
});



</script>
