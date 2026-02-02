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
          component: () => import('@/components/App/AccountView/CredentialView.vue'),
          meta: {title: 'Welcome back ...', button_text:'Sign In', info_text: "Don't have an Account?", action_string: 'register', action_button: 'Create one'}
        },
        {
          path: '/account/register',
          name: 'Register',
          component: () => import('@/components/App/AccountView/CredentialView.vue'),
          meta: {title: 'Welcome back to BuenoWS', button_text:'Register', info_text: "Already have an Account?", action_string: 'login', action_button: 'Sign In'}
        }
      ]
    }
  ],
})

export default router
