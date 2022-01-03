<template>
<li>
  <a 
    class="pagination-link"
    :class="{ 'is-current': isCurrent}"
    :aria-label="`Goto page ${pageNumber}`"
    :aria-current="isCurrent ? 'page' : null"
    @click="currentPage = pageNumber"
  >
    {{ pageNumber }}
  </a>
</li>
</template>

<script setup lang="ts">
import { computed, } from 'vue';
import { injectAccessors } from '@/composables/injected-accessors';

const props = defineProps<{
  pageNumber: number;
}>();

const currentPage = injectAccessors<number>("CurrentPage");

const isCurrent = computed(() => props.pageNumber === currentPage.value);

</script>
