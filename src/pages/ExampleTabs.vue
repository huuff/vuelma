<template>
<base-tabs tabStyle="boxed" alignment="centered">
  <base-tab titleText="Tab 1">
    Test content for tab 1
  </base-tab>
  <base-tab titleText="Tab 2" icon="heart">
    Test content for tab 2
  </base-tab>
  <base-tab titleText="Tab 3">
    Test content for tab 3
  </base-tab>
</base-tabs>
</template>

<script setup lang="ts">
import BaseTabs from '@/components/tabs/BaseTabs.vue';
import BaseTab from '@/components/tabs/BaseTab.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart);

</script>
