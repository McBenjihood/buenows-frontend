import { createRouter, createWebHistory } from 'vue-router'

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
      name: 'Contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('@/views/AccountView.vue'),
      redirect: '/account/login',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/components/App/AccountView/CredentialView.vue'),
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
          component: () => import('@/components/App/AccountView/CredentialView.vue'),
          meta: {
            title: 'Welcome back to BuenoWS',
            button_text: 'Register',
            info_text: 'Already have an Account?',
            action_string: 'login',
            action_button: 'Sign In',
          },
        },
      ],
    },
  ],
})

export default router
