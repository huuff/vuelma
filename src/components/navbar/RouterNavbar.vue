<template>
<base-navbar :activeItem="router.currentRoute.value.name?.toString()">
  <template #brand>
    <navbar-item
      :tag="RouterLink"
      to="/"
      :titleText="rootRoute.name!.toString()" 
      class="has-text-weight-bold is-size-4"
    />
  </template>

  <template #end>
    <navbar-item v-for="route of routesWithoutRoot"
      :tag="RouterLink"
      :to="route.path"
      :titleText="route.name!.toString()"
      :key="route.path"
    />
  </template>
</base-navbar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import BaseNavbar from "./BaseNavbar.vue";
import NavbarItem from "./NavbarItem.vue";

const router = useRouter();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootRoute = computed(() => router.getRoutes().find(r => r.path === "/")!);
const routesWithoutRoot = computed(() => router.getRoutes().filter(r => r.path !== "/"));
</script>
