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
      path: '/legal',
      name: 'Legal',
      component: () => import('@/views/LegalView.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/AuthView.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/components/App/account/CredentialsForm.vue'),
          meta: {
            requiresGuest: true,
            action_string: 'register',
          },
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/components/App/account/CredentialsForm.vue'),
          meta: {
            requiresGuest: true,
            action_string: 'login',
          },
        },
        {
          path: 'reset-password',
          name: 'ResetPassword',
          component: () => import('@/components/App/account/ResetPasswordForm.vue'),
          meta: {
            requiresGuest: true,
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
      path: '/account/admin/users',
      name: 'AdminUsers',
      component: () => import('@/views/AdminUsersView.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/account/admin/inquiries',
      name: 'AdminInquiries',
      component: () => import('@/views/AdminInquiriesView.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  if (!authStore.isInitialized) {
    await authStore.initialize()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'Login' }
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return { name: 'Account' }
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return { name: 'Account' }
  }
})

router.onError((error, to) => {
  if (
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed') ||
    error.message.includes('error loading dynamically imported module')
  ) {
    window.location.href = to.fullPath
  }
})

export default router
