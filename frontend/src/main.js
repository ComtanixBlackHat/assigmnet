// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '../routes';  // Adjust the path if needed

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
