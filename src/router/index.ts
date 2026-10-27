import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/OrderView.vue'
import ProfileView from '@/views/UserView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

// Ovo je navigaciona zaštita prototipa stvarna autorizacija zahteva serversku proveru
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem('flora_user')) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
});

export default router