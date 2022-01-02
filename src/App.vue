<template>
<base-navbar class="is-fixed-top">
  <template #brandItems>
    <base-navbar-item :title="'Vuelma'">
      <router-link to="/" class="has-text-weight-bold is-size-4"></router-link>
    </base-navbar-item>
  </template>
  <template #end>
  <base-navbar-item
    v-for="[path, name] in routes()"
    :title="name"
    :key="path"
  >
    <router-link :to="path"></router-link>
  </base-navbar-item>
  </template>
</base-navbar>
<main class="container">
  <router-view></router-view>
</main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseNavbar from '@/components/BaseNavbar.vue';
import BaseNavbarItem from '@/components/BaseNavbarItem.vue';

const router = useRouter();

function routes(): [string, string][] {
  return router.getRoutes()
    .filter(route => route.name)
    .map(route => [route.path, route.name!.toString()]);
}
</script>
