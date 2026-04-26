import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../services/auth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/services',
      name: 'Services',
      component: () => import('@/views/ServicesView.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('@/views/ContactView.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/AuthView.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/components/App/AccountView/CredentialComponent.vue'),
          meta: {
            requiresGuest: true,
            action_string: 'register',
          },
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/components/App/AccountView/CredentialComponent.vue'),
          meta: {
            requiresGuest: true,
            action_string: 'login',
          },
        },
      ],
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('@/views/AccountView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/account/editor',
      name: 'PostEditor',
      component: () => import('@/views/PostEditorView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'Login' }
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return { name: 'Account' }
  }
})

export default router
