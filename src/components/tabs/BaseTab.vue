<template>
<slot></slot>
</template>

<script setup lang="ts">
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';

const props = defineProps<{
  titleText: string;
  tabId?: string;
  icon?: FontAwesomeIconName
}>();
</script>
