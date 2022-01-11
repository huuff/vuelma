<template>
<div class="container">
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body">
        <div class="column is-3-desktop mx-auto">
        <base-menu>
          <menu-list label="First Menu">
            <menu-item titleText="Elem 1" />
            <menu-item titleText="Elem 2" />
            <menu-list label="Stacked Menu">
              <menu-item titleText="Stacked Elem 1" />
              <menu-item titleText="Stacked Elem 2" />
            </menu-list>
          </menu-list>
          <menu-list label="Second Menu">
            <menu-item titleText="Elem 3" />
            <menu-item titleText="Elem 4" />
            <menu-item titleText="Elem 5" />
          </menu-list>
        </base-menu>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import BaseMenu from '@/components/menu/BaseMenu.vue';
import MenuItem from "@/components/menu/MenuItem.vue";
import MenuList from "@/components/menu/MenuList.vue";
</script>
