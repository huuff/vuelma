<template>
<classed-slot :childrenClass="'test'">
  <a href="#">1</a>
  <a href="#">2</a>
  <a href="#">3</a>
</classed-slot>
</template>

<script setup lang="ts">
import ClassedSlot from '@/components/ClassedSlot.js';
</script>
