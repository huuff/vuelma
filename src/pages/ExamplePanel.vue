<template>
<div class="column is-5 mx-auto">
  <base-panel headingText="Simple panel without tabs">
    <panel-block titleText="Block 1" icon="chevron-right" />
    <panel-block titleText="Block 2" icon="chevron-right" />
    <panel-block titleText="Block 3" icon="chevron-right" />
    <panel-block titleText="Block 4" icon="chevron-right" />
  </base-panel>
</div>
</template>

<script setup lang="ts">
// TODO: Example with tabs
import BasePanel from "@/components/panel/BasePanel.vue";
import PanelBlock from "@/components/panel/PanelBlock.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronRight);
</script>
