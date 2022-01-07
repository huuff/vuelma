<template>
<div class="column is-5 mx-auto">
  <base-panel headingText="Panel with tabs" v-model:activeTabId="firstExampleActiveTab">
    <panel-tabs>
      <panel-tab titleText="Tab 1">
        <panel-block 
          v-for="i in range(3)" 
          icon="chevron-right" 
          :titleText="`Block ${i}`"
          :key="`Block ${i}`"
        />
      </panel-tab>
      <panel-tab titleText="Tab 2">
        <panel-block 
          v-for="i in range(8)" 
          icon="chevron-right" 
          :titleText="`Block ${i}`"
          :key="`Block ${i}`"
        />
      </panel-tab>
      <panel-tab titleText="Tab 3">
        <panel-block 
          v-for="i in range(5)" 
          icon="chevron-right" 
          :titleText="`Block ${i}`"
          :key="`Block ${i}`"
        />
      </panel-tab>
    </panel-tabs>
  </base-panel>

  <hr class="my-5">

  <base-panel v-for="color in colorArray" 
  :color="color"
  :headingText="`Panel ${color}`"
  :key="`Panel ${color}`"
  >
    <panel-tabs>
      <panel-tab titleText="Tab 1">
        <panel-block 
          v-for="i in range(3)" 
          icon="chevron-right" 
          :titleText="`Block ${i}`"
          :key="`Block ${i}`"
        />
      </panel-tab>
      <panel-tab titleText="Tab 2">
        <panel-block 
          v-for="i in range(8)" 
          icon="chevron-right" 
          :titleText="`Block ${i}`"
          :key="`Block ${i}`"
        />
      </panel-tab>
      <panel-tab titleText="Tab 3">
        <panel-block 
          v-for="i in range(5)" 
          icon="chevron-right" 
          :titleText="`Block ${i}`"
          :key="`Block ${i}`"
        />
      </panel-tab>
    </panel-tabs>
  </base-panel>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BasePanel from "@/components/panel/BasePanel.vue";
import PanelBlock from "@/components/panel/PanelBlock.vue";
import PanelTabs from "@/components/panel/PanelTabs.vue";
import PanelTab from "@/components/panel/PanelTab.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { colorArray } from "@/types/bulma-color";

library.add(faChevronRight);

const firstExampleActiveTab = ref("Tab 1");

function range(num: number): number[] {
  return [...Array(num).keys()];
}
</script>
