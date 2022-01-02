<template>
<li>
  <a 
    class="pagination-link"
    :class="{ 'is-current': isCurrent}"
    :aria-label="`Goto page ${pageNumber}`"
    :aria-current="isCurrent ? 'page' : null"
    @click="gotoPage(pageNumber)"
  >
    {{ pageNumber }}
  </a>
</li>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { PageKey, GotoPageKey } from '@/symbols';

const props = defineProps<{
  pageNumber: number;
}>();

const currentPage = inject(PageKey);
const gotoPage = inject(GotoPageKey);

if (!currentPage || !gotoPage) {
  throw new Error("Some necesary function hasn't been provided from BasePagination to BasePaginationLink");
}

const isCurrent = computed(() => props.pageNumber === currentPage());

</script>
