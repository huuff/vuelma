<template>
<nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous">Previous</a>
  <a class="pagination-next">Next</a>
  <template v-if="pageNumber > 0">
    <ul class="pagination-list">
      <base-pagination-link 
        v-if="!backwardReachesFirst"
        :pageNumber="1" 
        :currentPage="currentPage"
      />

      <li v-if="!backwardReachesFirst">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      
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

      <li v-if="!forwardReachesLast">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <base-pagination-link 
        v-if="!forwardReachesLast"
        :pageNumber="pageNumber"
        :currentPage="currentPage"
      />
    </ul>
  </template>
</nav>
</template>

<script setup lang="ts">
// TODO: Icons for previous and next?
// TODO: Provides and inject for current page? And also emitting goto
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
  const last = Math.min(props.pageNumber, props.currentPage + props.showAround + 1);
  const pagesToShow: number[] = [];

  for (let page = props.currentPage + 1; page <= last; page++)
    pagesToShow.push(page);

  return pagesToShow;
});

const backwardReachesFirst = computed(() => {
  return showBackward.value.includes(1) || showBackward.value.length === 0;
});

const forwardReachesLast = computed(() => {
  return showForward.value.includes(props.pageNumber) || showForward.value.length === 0;
});

</script>
