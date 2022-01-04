<template>
<li>
  <a @click="activeItem = actualItemId"
    :class="{ 'is-active': activeItem === actualItemId }"
  >{{ title }}</a>
</li>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { injectAccessors } from '@/composables/injected-accessors';
import { useOptionalItemId } from '@/composables/optional-item-id';

const props = defineProps<{
  title: string;
  itemId?: string;
}>();

const actualItemId = useOptionalItemId(toRef(props, "title"), toRef(props, "itemId"));

const activeItem = injectAccessors<string>("ActiveMenuItem");
</script>
