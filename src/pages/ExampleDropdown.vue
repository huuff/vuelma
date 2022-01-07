<template>
<div class="hero is-fullheight">
  <div class="hero-body">
    <div class="mx-auto">
      <base-dropdown triggerText="Click here" class="mr-2">
        <dropdown-item titleText="First"/>
        <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
        <dropdown-item titleText="Third"/>
        <dropdown-divider />
        <dropdown-item titleText="Fourth"/>
      </base-dropdown>

      <selector-dropdown triggerText="Select one" class="mr-2">
        <dropdown-item titleText="First"/>
        <dropdown-item titleText="Second"/>
        <dropdown-item titleText="Third"/>
      </selector-dropdown>

      <base-dropdown triggerText="This one opens up" direction="up" class="mr-5" hoverable>
        <dropdown-item titleText="First"/>
        <dropdown-item titleText="Second"/>
        <dropdown-item titleText="Third"/>
      </base-dropdown>

      <base-dropdown v-for="alignment in alignmentArray"
        :alignment="alignment"
        :triggerText="`Aligned ${alignment}`"
        :key="alignment"
        class="mr-2"
      >
        <dropdown-item titleText="First"/>
        <dropdown-item titleText="Second"/>
        <dropdown-item titleText="Third"/>
      </base-dropdown>

      <br/>
      <hr/>

      <base-dropdown v-for="color in colorArray"
        :triggerText="`Dropdown ${color}`"
        :key="`Dropdown ${color}`"
        :color="color"
        class="mr-2 mb-2"
      >
        <dropdown-item titleText="First"/>
        <dropdown-item titleText="Second"/>
        <dropdown-item titleText="Third"/>
      </base-dropdown>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import BaseDropdown from '@/components/dropdown/BaseDropdown.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
import DropdownDivider from '@/components/dropdown/DropdownDivider.vue';
import SelectorDropdown from '@/components/dropdown/SelectorDropdown.vue';
import { alignmentArray } from '@/types/alignment';
import { colorArray } from '@/types/bulma-color';
</script>
