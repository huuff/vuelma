import { createApp } from 'vue';
import "bulma";
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount('#app');
