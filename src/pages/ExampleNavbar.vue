<template>
<base-navbar>
  <template #end>
    <navbar-item v-for="num in testArray" 
      :title="`test-${num}`"
      :key="`test-${num}`"
    />
  </template>
</base-navbar>
</template>

<script setup lang="ts">
import BaseNavbar from '@/components/navbar/BaseNavbar.vue';
import NavbarItem from '@/components/navbar/NavbarItem.vue';

const testArray = ["1", "2", "3"];
</script>
