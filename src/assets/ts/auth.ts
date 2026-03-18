import { reactive } from 'vue'
import { checkAuth } from '@/assets/ts/api_functions.ts'

export const authStore = reactive({
  isAuthenticated: false,
  user: null as any,

  async initialize() {
    const hasToken = !!localStorage.getItem('token')
    if (!hasToken) {
      this.isAuthenticated = false
      return
    }
    this.isAuthenticated = await checkAuth()
  },

  setAuthenticated(status: boolean, token?: string) {
    this.isAuthenticated = status
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },
})
