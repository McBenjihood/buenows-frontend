import { reactive } from 'vue'
import { checkAuth } from '@/services/api.ts'

export const authStore = reactive({
  isAuthenticated: false,
  token: null as string | null,
  refreshToken: null as string | null,

  initialize() {
    const savedToken = localStorage.getItem('JWT')
    const savedRefreshToken = localStorage.getItem('REFRESH_TOKEN')

    this.token = savedToken
    this.refreshToken = savedRefreshToken
    this.isAuthenticated = checkAuth()
  },

  setAuthenticated(auth: boolean, jwtToken: string | null, refreshToken: string | null = null) {
    this.isAuthenticated = auth
    this.token = jwtToken
    this.refreshToken = refreshToken

    if (jwtToken) {
      localStorage.setItem('JWT', jwtToken)
    } else {
      localStorage.removeItem('JWT')
    }

    if (refreshToken) {
      localStorage.setItem('REFRESH_TOKEN', refreshToken)
    } else {
      localStorage.removeItem('REFRESH_TOKEN')
    }
  },

  logout() {
    this.isAuthenticated = false
    this.token = null
    this.refreshToken = null
    localStorage.removeItem('JWT')
    localStorage.removeItem('REFRESH_TOKEN')
  },
})
