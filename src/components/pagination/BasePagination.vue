<template>
<nav class="pagination" role="navigation" aria-label="pagination">
  <button
    type="button"
    :disabled="actualCurrentPage === 1"
    @click="actualCurrentPage--"
    class="pagination-previous button" 
    aria-label="previous page"
    ><font-awesome-icon icon="angle-left"/>
  </button>
  <button
    @click="actualCurrentPage++"
    :disabled="actualCurrentPage === pageNumber"
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
        :pageNumber="actualCurrentPage"
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
import { computed, toRef } from 'vue';
import { provideAccessors } from '@/composables/injected-accessors'
import BasePaginationLink from '@/components/pagination/BasePaginationLink.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import partial from 'lodash/partial';
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';

library.add(faAngleLeft);
library.add(faAngleRight);

const props = withDefaults(defineProps<{
  pageNumber: number;
  currentPage?: number;
  showAround?: number;
}>(), {
  showAround: 2,
  currentPage: undefined,
});

const emit = defineEmits<{
  (event: 'update:currentPage', page: number): void
}>();

const actualCurrentPage = useOptionalTwoWayBinding(1, toRef(props, 'currentPage'), partial(emit, "update:currentPage"))

provideAccessors("CurrentPage", toRef(props, 'currentPage'), partial(emit, "update:currentPage"));

const showBackward = computed(() => {
  const first = Math.max(1, actualCurrentPage.value - props.showAround);
  const pagesToShow: number[] = [];

  for (let page = first; page < actualCurrentPage.value; page++)
    pagesToShow.push(page);
  
  return pagesToShow;
});

const showForward = computed(() => {
  const last = Math.min(props.pageNumber, actualCurrentPage.value + props.showAround);
  const pagesToShow: number[] = [];

  for (let page = actualCurrentPage.value + 1; page <= last; page++)
    pagesToShow.push(page);

  return pagesToShow;
});

const backwardReachesFirst = computed(() => {
  return showBackward.value.includes(1) || showBackward.value.length === 0;
});

const forwardReachesLast = computed(() => {
  return showForward.value.includes(props.pageNumber) || showForward.value.length === 0;
});

if (actualCurrentPage.value < 1 || actualCurrentPage.value > props.pageNumber) {
  throw new Error(`Current page can't be over the pageNumber or under 1, current value: ${actualCurrentPage.value}`)
}

</script>
