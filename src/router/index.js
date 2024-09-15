import { createRouter, createWebHistory } from 'vue-router';
import Pokemon from '../views/PokemonView.vue';

const routes = [

  {
    path: '/',
    name: 'Pokemon',
    component: Pokemon
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;