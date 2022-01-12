<template>
<base-pagination v-model:currentPage="actualCurrentPage" :pageNumber="pageNumber" :showAround="showAround">
</base-pagination>
<div>
  <slot :items="itemsToShow"></slot> 
</div>
</template>

<script setup lang="ts">
import { toRef, computed } from "vue";
import BasePagination from "./BasePagination.vue";
import { useOptionalTwoWayBinding } from "@/composables/optional-two-way-binding";
import partial from "lodash/partial";

const props = withDefaults(defineProps<{
  items: unknown[];
  itemsPerPage?: number;
  currentPage?: number;
  showAround?: number;
}>(), {
  showAround: 2,
  currentPage: undefined,
  itemsPerPage: 10,
});

const emit = defineEmits<{
  (event: "update:currentPage", newCurrentPage: number): void;
}>();

const actualCurrentPage = useOptionalTwoWayBinding(1, toRef(props, "currentPage"), partial(emit, "update:currentPage"));

const pageNumber = computed(() => Math.floor(props.items.length / props.itemsPerPage));

const itemsToShow = computed(() => {
  const start = (actualCurrentPage.value-1) * props.itemsPerPage;
  const itemsToShow = props.items.slice(start, start + props.itemsPerPage);
  return itemsToShow;
});
</script>
