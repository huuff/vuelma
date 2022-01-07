<template>
<div class="column is-5 mx-auto">
  <base-panel headingText="Simple panel without tabs">
    <panel-block titleText="Block 1" />
    <panel-block titleText="Block 2" />
    <panel-block titleText="Block 3" />
    <panel-block titleText="Block 4" />
  </base-panel>
</div>
</template>

<script setup lang="ts">
// TODO: Icons to example
// TODO: Example with tabs
import BasePanel from "@/components/panel/BasePanel.vue";
import PanelBlock from "@/components/panel/PanelBlock.vue";
</script>
