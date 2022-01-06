<template>
  <div class="card">
    <header class="card-header">
      <slot name="header">
        <p v-if="headerTitle" class="card-header-title">
          {{ headerTitle }}
        </p>
        <div v-if="icon" class="card-header-icon">
          <span class="icon">
            <font-awesome-icon :icon="icon" aria-hidden></font-awesome-icon>
          </span>
        </div>
      </slot>
    </header>
    <div v-if="image" class="card-image">
      <figure class="image">
        <img :src="image">
      </figure>
    </div>
    <div v-if="$slots.default" class="card-content">
      <slot></slot>
    </div>
    <footer v-if="$slots.footer || $slots.footerItems" class="card-footer"> 
      <slot name="footer"></slot>
      <classed-slot :children-class="'card-footer-item'">
        <slot name="footerItems"></slot>
      </classed-slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';
import ClassedSlot from '@/components/slots/ClassedSlot';

const props = defineProps<{
  headerTitle?: string;
  image?: string;
  icon?: FontAwesomeIconName;
}>();

const slots = useSlots();

if (slots.footer && slots.footerItems) {
  throw new Error('The card component cannot be used with both a footer and footerItems!');
}

if (slots.header && (slots.headerTitle || slots.icon)) {
  throw new Error('The card component cannot be used with both a header and a headerTitle or an icon!');
}
</script>
