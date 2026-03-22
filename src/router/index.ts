import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../services/auth.ts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'ContactComponent',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/AuthView.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/components/App/AuthView/CredentialComponent.vue'),
          meta: {
            title: 'Welcome back ...',
            button_text: 'Sign In',
            info_text: "Don't have an Account?",
            action_string: 'register',
            action_button: 'Create one',
          },
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/components/App/AuthView/CredentialComponent.vue'),
          meta: {
            title: 'Welcome back to BuenoWS',
            button_text: 'Register',
            info_text: 'Already have an Account?',
            action_string: 'login',
            action_button: 'Sign In',
          },
        }
      ],
    },
    {
      path: '/account',
      name: 'Account',
      component: () => '@/views/AccountView.vue'
    }
  ],
})

router.beforeEach((to) => {
  if (to.path.startsWith('/account')) {
    if (!authStore.isAuthenticated) {
      return { name: 'Login' }
    }
  }
})

export default router
