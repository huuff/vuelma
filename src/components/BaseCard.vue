<template>
  <div class="card">
    <header class="card-header">
      <slot name="header">
        <p v-if="title" class="card-header-title">
          {{ title }}
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
    <div v-if="$slots.content" class="card-content">
      <slot name="content"></slot>
    </div>
    <footer v-if="$slots.footer || $slots.footerItems" class="card-footer"> 
      <slot name="footer"></slot>
      <slot name="footerItems"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
// TODO: Validations!
import { useSlots, onMounted, onBeforeUpdate} from 'vue';

const props = defineProps<{
  title?: string;
  image?: string;
  icon?: string | [string, string];
}>();

onBeforeUpdate(() => addClassToFooterItems());
onMounted(() => addClassToFooterItems());

// HACK: This feels hacky, at least, and also
// the classes seem to go away when dev-server reloads the page
function addClassToFooterItems() {
  const slots = useSlots();

  if (slots && slots.footerItems) {
    for (const item of slots.footerItems()) {
      item.el?.classList.add("card-footer-item");
    }
  }
}
</script>
