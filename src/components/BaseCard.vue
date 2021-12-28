<template> <!-- TODO: Use semantic html -->
  <div class="card">
    <div class="card-header">
      <slot name="header">
        <p v-if="title" class="card-header-title">
          {{ title }}
        </p>
        <div class="card-header-icon"> <!-- TODO: Integrate with FontAwesome -->
          <span class="icon">
            <slot name="icon"></slot>
          </span>
        </div>
      </slot>
    </div>
    <div v-if="image" class="card-image">
      <figure class="image">
        <img :src="image">
      </figure>
    </div>
    <div v-if="$slots.content" class="card-content">
      <slot name="content"></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer"> 
      <!-- TODO: How could I do card-footer-items? -->
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  image?: string;
}>();
</script>
