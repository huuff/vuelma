<template>
<base-navbar class="is-fixed-top">
  <template #brandItems>
    <router-link to="/" class="has-text-weight-bold is-size-4">Vuelma</router-link>
  </template>
  <template #end>
    <router-link to="/card">Card</router-link>
    <router-link to="/breadcrumb">Breadcrumb</router-link>
    <router-link to="/dropdown">Dropdown</router-link>
    <router-link to="/message">Message</router-link>
    <router-link to="/modal">Modal</router-link>
    <router-link to="/pagination">Pagination</router-link>
    <router-link to="/panel">Panel</router-link>
    <router-link to="/menu">Menu</router-link>
    <router-link to="/tabs">Tabs</router-link>
  </template>
</base-navbar>
<main class="container">
  <router-view></router-view>
</main>
</template>

<script setup lang="ts">
// TODO: Autogenerate from router?
import BaseNavbar from '@/components/BaseNavbar.vue';
</script>
