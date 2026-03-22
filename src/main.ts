import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { authStore } from './services/auth.ts'

authStore.initialize()

const app = createApp(App)

app.use(router)

app.mount('#app')
