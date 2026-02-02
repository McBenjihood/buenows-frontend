import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('/src/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('/src/views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('/src/views/ContactView.vue')
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('/src/views/AccountView.vue'),
      children: [
        {
          path: '/account/login',
          name: 'Login',
          component: () => import('/src/views/AccountView/LoginView.vue')
        },
        {
          path: '/account/register',
          name: 'Register',
          component: () => import('/src/views/AccountView/RegisterView.vue')
        }
      ]
    }
  ],
})

export default router
