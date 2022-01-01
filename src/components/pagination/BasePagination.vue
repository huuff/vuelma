<template>
<nav class="pagination" role="navigation" aria-label="pagination">
  <button
    type="button"
    :disabled="currentPage === 1"
    @click="emit('gotoPage', currentPage-1)"
    class="pagination-previous button" 
    aria-label="previous page"
    ><font-awesome-icon icon="angle-left"/>
  </button>
  <button
    @click="emit('gotoPage', currentPage+1)"
    :disabled="currentPage === pageNumber"
    type="button"
    class="pagination-next button "
    aria-label="next page"
  >
    <font-awesome-icon icon="angle-right"/>
  </button>
  <template v-if="pageNumber > 0">
    <ul class="pagination-list">
      <base-pagination-link 
        v-if="!backwardReachesFirst"
        :pageNumber="1" 
      />

      <li v-if="!backwardReachesFirst && !showBackward.includes(2)">
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

      <li v-if="!forwardReachesLast && !showForward.includes(pageNumber - 1)">
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
// XXX: Pretty shitty logic in here but I'm no mathematician
// TODO: Use InjectionKey for the provides and inject?
import { computed, provide } from 'vue';
import BasePaginationLink from '@/components/pagination/BasePaginationLink.vue';
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

const emit = defineEmits<{
  (event: 'gotoPage', page: number): void
}>();

provide('currentPage', () => props.currentPage);
provide('gotoPage', (page: number) => {
  emit('gotoPage', page)
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

if (props.currentPage < 1 || props.currentPage > props.pageNumber) {
  throw new Error(`Current page can't be over the pageNumber or under 1, current value: ${props.currentPage}`)
}

</script>
