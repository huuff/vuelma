<template>
<li>
  <a @click="activeItem = actualItemId"
    :class="{ 'is-active': activeItem === actualItemId }"
  >{{ titleText }}</a>
</li>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { injectAccessors } from '@/composables/injected-accessors';
import { useOptionalItemId } from '@/composables/optional-item-id';

const props = defineProps<{
  titleText: string;
  itemId?: string;
}>();

const actualItemId = useOptionalItemId(toRef(props, "titleText"), toRef(props, "itemId"));

const activeItem = injectAccessors<string>("ActiveMenuItem");
</script>
