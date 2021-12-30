<template>
<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li 
      v-for="part in pathParts" 
      :key="`breadcrumb-${part}`" 
      :class="{ 'is-active': isCurrent(part)}" 
      >
      <router-link :to="routeFromPart(part).path" :aria-current="isCurrent(part) ? 'page' : null">
        {{ routeFromPart(part).name }}
      </router-link>
    </li>
  </ul>
</nav>
</template>

<script setup lang="ts">
import { useRouter, RouteRecordNormalized } from 'vue-router';

// FUTURE: building the path is done like 5 times for every element.
// This could be solved if there was a way to have local variables in the templates
// (local to an element and its children) but I found no way to do it except for using a v-for
const router = useRouter();
const pathParts = router.currentRoute.value.path.split("/");
pathParts[0] = "/";

function buildPathTo(part: string): string {
  const index = pathParts.findIndex((el) => el === part);
  if (index === -1) {
    throw new Error(`${part} is not in the path`);
  }

  return pathParts.slice(0, index+1).join("/").replaceAll("//","/");
}

function routeFromPath(path: string): RouteRecordNormalized {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return router.getRoutes().find(r => r.path === path)!;
}

function routeFromPart(part: string): RouteRecordNormalized {
  return routeFromPath(buildPathTo(part));
}

function isCurrent(part: string): boolean {
  return buildPathTo(part) === router.currentRoute.value.path;
}
</script>
