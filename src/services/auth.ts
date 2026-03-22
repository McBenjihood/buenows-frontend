import { reactive } from 'vue'
import { checkAuth } from '@/services/api.ts'

export const authStore = reactive({
  isAuthenticated: false,
  token: null as string | null,

  initialize() {
    const savedToken = localStorage.getItem('JWT')
    this.token = savedToken
    this.isAuthenticated = checkAuth()
  },

  setAuthenticated(auth: boolean, jwtToken: string | null) {
    this.isAuthenticated = auth
    this.token = jwtToken

    if (jwtToken) {
      localStorage.setItem('JWT', jwtToken)
    } else {
      localStorage.removeItem('JWT')
    }
  },

  logout() {
    this.isAuthenticated = false
    this.token = null
    localStorage.removeItem('JWT')
  },
})
