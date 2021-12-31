<template>
<base-navbar>
  <template #brandItems>
    <router-link to="/">Vuelma</router-link>
  </template>
  <template #end>
    <router-link to="/card">Card</router-link>
    <router-link to="/classed-slot">Classed Slot</router-link>
    <router-link to="/breadcrumb">Breadcrumb</router-link>
    <router-link to="/dropdown">Dropdown</router-link>
    <router-link to="/message">Message</router-link>
    <router-link to="/modal">Modal</router-link>
  </template>
</base-navbar>
<main class="container">
  <router-view></router-view>
</main>
</template>

<script setup lang="ts">
import BaseNavbar from '@/components/BaseNavbar.vue';

</script>
