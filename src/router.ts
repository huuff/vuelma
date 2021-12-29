import { createRouter, createWebHistory } from 'vue-router';
import ExampleCard from '@/pages/ExampleCard.vue';
import RenderTest from '@/pages/RenderTest.vue';

const routes = [
  { path: "/card", component: ExampleCard },
  { path: "/render", component: RenderTest },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
