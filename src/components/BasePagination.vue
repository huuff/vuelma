<template>
<nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous">Previous</a>
  <a class="pagination-next">Next</a>
  <ul class="pagination-list">
    <base-pagination-link 
      :pageNumber="1" 
      :currentPage="currentPage"
    />
    
    <base-pagination-link v-for="page in showBackward"
      :pageNumber="page"
      :currentPage="currentPage"
      :key="`page-${page}`"
    />

    <base-pagination-link
      :pageNumber="currentPage"
      :currentPage="currentPage"
    />

    <base-pagination-link v-for="page in showForward"
      :pageNumber="page"
      :currentPage="currentPage"
      :key="`page-${page}`"
    />

    <base-pagination-link v-if="pageNumber > 1"
      :pageNumber="pageNumber"
      :currentPage="currentPage"
    />
  </ul>
</nav>
</template>

<script setup lang="ts">
// TODO: Icons for previous and next?
// TODO: Provides and inject for current page? And also emitting goto
// TODO: Ellipsis..es
// TODO: Edge cases: backward and forward are fewer than to first and last, 0 pages
// TODO: Validation that current page must be between 1 and last page?
// TODO: Obviously, goto page events!
// TODO: Test it!
import { computed } from 'vue';
import BasePaginationLink from '@/components/BasePaginationLink.vue';

const props = withDefaults(defineProps<{
  pageNumber: number;
  currentPage: number;
  showAround?: number;
}>(), {
  showAround: 2,
});

const showBackward = computed(() => {
  const first = Math.max(1, props.currentPage - props.showAround);
  const pagesToShow: number[] = [];

  for (let page = first; page < props.currentPage; page++)
    pagesToShow.push(page);
  
  return pagesToShow;
});

const showForward = computed(() => {
  const last = Math.min(props.pageNumber, props.currentPage + props.showAround);
  const pagesToShow: number[] = [];

  for (let page = last; page > props.currentPage; page--)
    pagesToShow.push(page);

  return pagesToShow;
});

</script>
