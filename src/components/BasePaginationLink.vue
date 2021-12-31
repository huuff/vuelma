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
import { computed } from 'vue';

const props = defineProps<{
  pageNumber: number;
  currentPage: number;
}>();

const isCurrent = computed(() => props.pageNumber === props.currentPage);

</script>
