import { createRouter, createWebHistory } from 'vue-router';
import ExampleCard from '@/pages/ExampleCard.vue';

const routes = [
  { path: "/card", component: ExampleCard },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
