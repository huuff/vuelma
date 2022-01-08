<template>
<main class="container">
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="mx-auto">
        <base-breadcrumb>
          <breadcrumb-item titleText="First" />
          <breadcrumb-item titleText="Second" />
          <breadcrumb-item titleText="Third" />
          <breadcrumb-item titleText="Fourth" icon="heart" />
        </base-breadcrumb>
      </div>
    </div>
  </div>
</main>
</template>

<script setup lang="ts">
import BaseBreadcrumb from '@/components/breadcrumb/BaseBreadcrumb.vue'
import BreadcrumbItem from '@/components/breadcrumb/BreadcrumbItem.vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);
</script>
