import { createRouter, createWebHistory } from 'vue-router';
import ExampleCard from '@/pages/ExampleCard.vue';
import ExampleBreadcrumb from '@/pages/ExampleBreadcrumb.vue';
import ExampleDropdown from '@/pages/ExampleDropdown.vue';
import ExampleMessage from '@/pages/ExampleMessage.vue';
import ExampleModal from '@/pages/ExampleModal.vue';
import ExamplePagination from '@/pages/ExamplePagination.vue';
import ExamplePanel from '@/pages/ExamplePanel.vue';
import ExampleMenu from '@/pages/ExampleMenu.vue';
import ExampleTabs from '@/pages/ExampleTabs.vue';
import ExampleNavbar from '@/pages/ExampleNavbar.vue';
import ExampleHome from '@/pages/ExampleHome.vue';

const routes = [
  { path: "/", component: ExampleHome, name: "Home" },
  { path: "/card", component: ExampleCard, name: "Card" },
  { path: "/breadcrumb", component: ExampleBreadcrumb, name: "Breadcrumb" },
  { path: "/dropdown", component: ExampleDropdown, name: "Dropdown" },
  { path: "/message", component: ExampleMessage, name: "Message"},
  { path: "/modal", component: ExampleModal, name: "Modal"},
  { path: "/pagination", component: ExamplePagination, name: "Pagination"},
  { path: "/panel", component: ExamplePanel, name: "Panel"},
  { path: "/menu", component: ExampleMenu, name: "Menu"},
  { path: "/tabs", component: ExampleTabs, name: "Tabs"},
  { path: "/navbar", component: ExampleNavbar, name: "Navbar"},
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
