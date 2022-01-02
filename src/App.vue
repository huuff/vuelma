<template>
<base-navbar class="is-fixed-top">
  <template #brandItems>
    <base-navbar-item itemId="Vuelma">
      <router-link to="/" class="has-text-weight-bold is-size-4">Vuelma</router-link>
    </base-navbar-item>
  </template>
  <template #end>
  <base-navbar-item
    v-for="[path, name] in routes()"
    :itemId="name"
    :key="path"
  >
    <router-link :to="path">{{ name }}</router-link>
  </base-navbar-item>
  </template>
</base-navbar>
<main class="container mt-3">
  <router-view></router-view>
</main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseNavbar from '@/components/navbar/BaseNavbar.vue';
import BaseNavbarItem from '@/components/navbar/BaseNavbarItem.vue';

const router = useRouter();

function routes(): [string, string][] {
  return router.getRoutes()
    .filter(route => route.name)
    .map(route => [route.path, route.name!.toString()]);
}
</script>
