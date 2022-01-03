<template>
<div class="column is-4 mx-auto">
  <base-panel 
    :title="'Example panel'" 
    :color="'primary'"
    v-model:activeTab="activeTab"
  >
    <base-panel-tabs>
      <template #test1>
        <base-panel-block 
          v-for="i in range(5)"
          :key="`test1-${i}`"
          :itemId="`test1-${i}`"
          :icon="'angle-right'"
        >Test1-{{i}}</base-panel-block>
      </template>
      <template #test2>
        <base-panel-block
          v-for="i in range(3)"
          :key="`test2-${i}`"
          :itemId="`test2-${i}`"
          :icon="'angle-right'"
      >Test2-{{i}}</base-panel-block>
      </template>
      <template #test3>
        <base-panel-block
          v-for="i in range(8)"
          :key="`test3-${i}`"
          :itemId="`test3-${i}`"
          :icon="'angle-right'"
        >Test3-{{i}}</base-panel-block>
      </template>
    </base-panel-tabs>
  </base-panel>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePanel from '@/components/panel/BasePanel.vue';
import BasePanelTabs from '@/components/panel/BasePanelTabs.vue';
import BasePanelBlock from '@/components/panel/BasePanelBlock.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleRight);

const activeTab = ref('test1');

function range(num: number) {
  return [...Array(num).keys()];
}
</script>
