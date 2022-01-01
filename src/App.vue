<template>
<base-navbar class="is-fixed-top">
  <template #brandItems>
    <router-link to="/" class="has-text-weight-bold is-size-4">Vuelma</router-link>
  </template>
  <template #end>
    <router-link  v-for="[path, name] in routes()" 
      :to="path"
      :key="path"
      >{{ name }}</router-link>
  </template>
</base-navbar>
<main class="container">
  <router-view></router-view>
</main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseNavbar from '@/components/BaseNavbar.vue';

const router = useRouter();

function routes(): [string, string][] {
  return router.getRoutes()
    .filter(route => route.name)
    .map(route => [route.path, route.name!.toString()]);
}
</script>
