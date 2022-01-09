<template>
<nav class="pagination" role="pagination" aria-label="pagination">
  <button 
    class="pagination-previous" 
    :disabled="actualCurrentPage === 1"
    @click="actualCurrentPage--"
    aria-label="previous"
    >
     <font-awesome-icon icon="angle-left" aria-hidden="true"/> 
  </button>
  <button 
    class="pagination-next" 
    :disabled="actualCurrentPage === pageNumber"
    @click="actualCurrentPage++"
    aria-label="next"
    >
     <font-awesome-icon icon="angle-right" aria-hidden="true"/> 
  </button>

  <ul class="pagination-list">
    <pagination-link v-if="!backwardReachesFirst && actualCurrentPage !== 1" 
    :page="1" />

    <li v-if="isThereAGapToFirst">
      <a class="pagination-ellipsis">&hellip;</a>  
    </li>

    <pagination-link 
      v-for="page in showBackward" 
      :key="`page ${page}`"
      :page="page"
    />

    <pagination-link :page="actualCurrentPage" />

    <pagination-link 
      v-for="page in showForward" 
      :key="`page ${page}`"
      :page="page"
    />

    <li v-if="isThereAGapToLast">
      <a class="pagination-ellipsis">&hellip;</a>  
    </li>
    <pagination-link v-if="!forwardReachesLast && actualCurrentPage !== pageNumber"
    :page="pageNumber" />
  </ul>
</nav>
</template>

<script setup lang="ts">
// TODO: For ellipses, if the ellided element is only 1, show it instead of the ellipsis?
import { toRef, computed, h } from "vue"
import { useOptionalTwoWayBinding } from "@/composables/optional-two-way-binding";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import classnames from "classnames";

library.add(faAngleRight, faAngleLeft)

import partial from "lodash/partial";

const props = withDefaults(defineProps<{
  currentPage?: number;
  pageNumber: number;
  showAround?: number;
}>(), {
  showAround: 2,
  currentPage: undefined,
});

const emit = defineEmits<{
  (event: "update:currentPage", newCurrentPage: number): void;
}>();

const actualCurrentPage = useOptionalTwoWayBinding(1, toRef(props, "currentPage"), partial(emit, "update:currentPage"));

const showBackward = computed(() => {
  const first = Math.max(1, actualCurrentPage.value - props.showAround);

  const show: number[] = [];

  for (let i = first; i < actualCurrentPage.value; i++) {
    show.push(i);
  }

  return show;
});

const showForward = computed(() => {
  const last = Math.min(props.pageNumber, actualCurrentPage.value + props.showAround);

  const show: number[] = [];

  for (let i = actualCurrentPage.value + 1; i <= last; i++) {
    show.push(i);
  }

  return show;
});

const backwardReachesFirst = computed(() => showBackward.value.includes(1));

const forwardReachesLast = computed(() => showForward.value.includes(props.pageNumber));

const isThereAGapToFirst = computed(() => showBackward.value.length > 0 && showBackward.value[0] > 2)

const isThereAGapToLast = computed(() => showForward.value.length > 0 && showForward.value[showForward.value.length-1] < props.pageNumber - 1 )

type PaginationLinkProps = {
  page: number;
};
const paginationLink = (props: PaginationLinkProps) => {
  const isCurrent = actualCurrentPage.value === props.page;
  return h(
    "li",
    {},
    h(
      "a",
      {
        class: classnames({
          "pagination-link": true,
          "is-current": isCurrent,
        }),
        onClick: () => actualCurrentPage.value = props.page,
        "aria-label": `Goto page ${props.page}`,
        ...(isCurrent ? { "aria-current" : true} : {})
      },
      props.page
    ),
)};

</script>
