import { reactive } from 'vue'
import { checkAuth, parseJwt } from '@/services/api.ts'

export const authStore = reactive({
  isAuthenticated: false,
  token: null as string | null,
  refreshToken: null as string | null,

  initialize() {
    const savedToken = localStorage.getItem('JWT')
    const savedRefreshToken = localStorage.getItem('REFRESH_TOKEN')

    this.token = savedToken
    this.refreshToken = savedRefreshToken

    if (!savedToken || !checkAuth()) {
      this.logout()
      return
    }

    try {
      const payload = parseJwt(savedToken)
      const nowInSeconds = Math.floor(Date.now() / 1000)

      if (!payload.exp || payload.exp <= nowInSeconds) {
        this.logout()
        return
      }

      this.isAuthenticated = true
    } catch {
      this.logout()
    }
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
