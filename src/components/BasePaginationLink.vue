<template>
<li>
  <a 
    class="pagination-link"
    :class="{ 'is-current': isCurrent}"
    :aria-label="`Goto page ${pageNumber}`"
    :aria-current="isCurrent ? 'page' : null"
  >
    {{ pageNumber }}
  </a>
</li>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

const props = defineProps<{
  pageNumber: number;
}>();

const currentPage = inject('currentPage') as number;

const isCurrent = computed(() => props.pageNumber === currentPage);

</script>
