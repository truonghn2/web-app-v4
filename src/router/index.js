import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DrinksView from '../views/DrinksView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    {
      path: '/drinks',
      name: 'Drinks',
      component: DrinksView
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: FavoritesView
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView
    },
  ],
})

export default router