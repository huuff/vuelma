<template>
<nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous" aria-label="previous page">
    <font-awesome-icon icon="angle-left"/>
  </a>
  <a class="pagination-next" aria-label="next page">
    <font-awesome-icon icon="angle-right"/>
  </a>
  <template v-if="pageNumber > 0">
    <ul class="pagination-list">
      <base-pagination-link 
        v-if="!backwardReachesFirst"
        :pageNumber="1" 
      />

      <li v-if="!backwardReachesFirst">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      
      <base-pagination-link v-for="page in showBackward"
        :pageNumber="page"
        :key="`page-${page}`"
      />

      <base-pagination-link
        :pageNumber="currentPage"
      />

      <base-pagination-link v-for="page in showForward"
        :pageNumber="page"
        :key="`page-${page}`"
      />

      <li v-if="!forwardReachesLast">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <base-pagination-link 
        v-if="!forwardReachesLast"
        :pageNumber="pageNumber"
      />
    </ul>
  </template>
</nav>
</template>

<script setup lang="ts">
// TODO: Provides and inject for emitting goto
// TODO: Validation that current page must be between 1 and last page?
// TODO: Obviously, goto page events!
// TODO: Test it!
import { computed, provide } from 'vue';
import BasePaginationLink from '@/components/BasePaginationLink.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faAngleLeft);
library.add(faAngleRight);

const props = withDefaults(defineProps<{
  pageNumber: number;
  currentPage: number;
  showAround?: number;
}>(), {
  showAround: 2,
});

provide('currentPage', props.currentPage);

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
