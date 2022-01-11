<template>
<router-navbar class="is-fixed-top"/>
<router-breadcrumb alignment="centered" separator="succeeds"/>
<main class="mt-3">
  <router-view></router-view>
</main>
</template>

<script setup lang="ts">
import RouterNavbar from "@/components/navbar/RouterNavbar.vue";
import RouterBreadcrumb from '@/components/breadcrumb/RouterBreadcrumb.vue';
</script>
