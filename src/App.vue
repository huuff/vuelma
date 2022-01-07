<template>
<base-navbar class="is-fixed-top" :activeItem="router.currentRoute.value.name?.toString()">
  <template #brand>
    <navbar-item 
      :tag="RouterLink"
      :to="'/'"
      class="has-text-weight-bold is-size-4"
      titleText="Vuelma"
      />
  </template>
  <template #end>
  <navbar-item
    :tag="RouterLink"
    v-for="[path, name] in routes()"
    :titleText="name"
    :key="path"
    :to="path"
  />
  </template>
</base-navbar>
<main class="container mt-3">
  <router-view></router-view>
</main>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import BaseNavbar from '@/components/navbar/BaseNavbar.vue';
import NavbarItem from '@/components/navbar/NavbarItem.vue';

const router = useRouter();

function routes(): [string, string][] {
  return router.getRoutes()
    .filter(route => route.name)
    .map(route => [route.path, route.name!.toString()]);
}
</script>
