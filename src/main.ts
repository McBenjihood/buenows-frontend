import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { authStore } from './services/auth.ts'

async function bootstrap() {
  await authStore.initialize()

  window.addEventListener('auth:logout', () => {
    authStore.clearAuthState()

    router.push('/auth/login').catch(() => {})
  })

  const app = createApp(App)
  app.use(router)
  app.use(i18n)
  app.mount('#app')
}

bootstrap()
