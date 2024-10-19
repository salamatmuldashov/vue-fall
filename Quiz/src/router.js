import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import UserDetails from './views/UserDetails.vue';

const routes = [
  { path: '', component: HomePage },
  { path: '/users/:id', component: UserDetails }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
