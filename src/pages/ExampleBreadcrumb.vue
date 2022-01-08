<template>
<main class="container">
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="mx-auto">
        <base-breadcrumb>
          <breadcrumb-item titleText="First" />
          <breadcrumb-item titleText="Second" />
          <breadcrumb-item titleText="Third" />
          <breadcrumb-item titleText="Fourth" />
        </base-breadcrumb>
      </div>
    </div>
  </div>
</main>
</template>

<script setup lang="ts">
import BaseBreadcrumb from '@/components/breadcrumb/BaseBreadcrumb.vue'
import BreadcrumbItem from '@/components/breadcrumb/BreadcrumbItem.vue';
</script>
