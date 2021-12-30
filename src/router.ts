import { createRouter, createWebHistory } from 'vue-router';
import ExampleCard from '@/pages/ExampleCard.vue';
import ExampleClassedSlot from '@/pages/ExampleClassedSlot.vue';
import ExampleBreadcrumb from '@/pages/ExampleBreadcrumb.vue';
import ExampleDropdown from '@/pages/ExampleDropdown.vue';
import ExampleMessage from '@/pages/ExampleMessage.vue';
import ExampleHome from '@/pages/ExampleHome.vue';

const routes = [
  { path: "/", component: ExampleHome, name: "Home" },
  { path: "/card", component: ExampleCard, name: "Card" },
  { path: "/classed-slot", component: ExampleClassedSlot, name: "Classed Slot" },
  { path: "/breadcrumb", component: ExampleBreadcrumb, name: "Breadcrumb" },
  { path: "/dropdown", component: ExampleDropdown, name: "Dropdown" },
  { path: "/message", component: ExampleMessage, name: "Message"},
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
