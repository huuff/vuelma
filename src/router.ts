import { createRouter, createWebHistory } from 'vue-router';
import ExampleCard from '@/pages/ExampleCard.vue';
import ExampleClassedSlot from '@/pages/ExampleClassedSlot.vue';

const routes = [
  { path: "/card", component: ExampleCard },
  { path: "/render", component: ExampleClassedSlot },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
