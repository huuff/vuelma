<template>
<div class="column is-4 mx-auto">
  <base-panel :title="'Example panel'" :color="'primary'">
    <base-panel-tabs :active="'test1'">
      <template #test1>
        <base-panel-block>Test1</base-panel-block>
      </template>
      <template #test2>
        <base-panel-block>Test2</base-panel-block>
      </template>
      <template #test3>
        <base-panel-block>Test3</base-panel-block>
      </template>
    </base-panel-tabs>
  </base-panel>
</div>
</template>

<script setup lang="ts">
import BasePanel from '@/components/panel/BasePanel.vue';
import BasePanelTabs from '@/components/panel/BasePanelTabs.vue';
import BasePanelBlock from '@/components/panel/BasePanelBlock.vue';
</script>
