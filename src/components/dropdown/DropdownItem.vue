<template>
  <a class="dropdown-item">
    {{ text }}
  </a>
</template>

<script setup lang="ts">

const props = defineProps<{
  text: string;
  itemId?: string;
}>();

</script>
