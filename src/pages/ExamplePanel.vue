<template>
<div class="column is-5 mx-auto">
  <base-panel headingText="Simple panel without tabs">
    <panel-block titleText="Block 1" icon="chevron-right" />
    <panel-block titleText="Block 2" icon="chevron-right" />
    <panel-block titleText="Block 3" icon="chevron-right" />
    <panel-block titleText="Block 4" icon="chevron-right" />
  </base-panel>

  <hr class="my-5" />

  <base-panel headingText="Panel with tabs">
    <panel-tabs>
      <panel-tab titleText="Tab 1">
        <panel-block titleText="Block 1" icon="chevron-right" />
        <panel-block titleText="Block 2" icon="chevron-right" />
        <panel-block titleText="Block 3" icon="chevron-right" />
      </panel-tab>
      <panel-tab titleText="Tab 2">
        <panel-block titleText="Block 4" icon="chevron-right" />
        <panel-block titleText="Block 5" icon="chevron-right" />
        <panel-block titleText="Block 6" icon="chevron-right" />
        <panel-block titleText="Block 7" icon="chevron-right" />
        <panel-block titleText="Block 8" icon="chevron-right" />
      </panel-tab>
    </panel-tabs>
  </base-panel>
</div>
</template>

<script setup lang="ts">
import BasePanel from "@/components/panel/BasePanel.vue";
import PanelBlock from "@/components/panel/PanelBlock.vue";
import PanelTabs from "@/components/panel/PanelTabs.vue";
import PanelTab from "@/components/panel/PanelTab.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronRight);
</script>
