<template>
<div class="column is-5 mx-auto">
  <base-panel headingText="Panel with tabs" v-model:activeTabId="activeTab">
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
  v-model:activeTabId="activeTab"
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

  <hr class="my-5" />
  <base-panel headingText="Repositories" activeTabId="All">
    <panel-block-content>
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Search">
        <span class="icon is-left">
          <font-awesome-icon icon="search" />
        </span>
      </p>
    </panel-block-content>
    <panel-tabs>
      <panel-tab titleText="All">
        <panel-block titleText="bulma" icon="book" />
        <panel-block titleText="marksheet" icon="book" />
        <panel-block titleText="minireset.css" icon="book" />
        <panel-block titleText="jgthms.github.com" icon="book" />
        <panel-block-content tag="label">
          <input type="checkbox">
          remember me
        </panel-block-content>
        <panel-block-content>
          <button class="button is-link is-outlined is-fullwidth">
            Reset all filters
          </button>
        </panel-block-content>
      </panel-tab>
      <panel-tab titleText="Public" />
      <panel-tab titleText="Private" />
      <panel-tab titleText="Sources" />
      <panel-tab titleText="Forks" />
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
import PanelBlockContent from "@/components/panel/PanelBlockContent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight, faSearch, faBook } from "@fortawesome/free-solid-svg-icons";
import { colorArray } from "@/types/bulma-color";

library.add(faChevronRight);
library.add(faSearch);
library.add(faBook);

const activeTab = ref("Tab 1");

function range(num: number): number[] {
  return [...Array(num).keys()];
}
</script>
