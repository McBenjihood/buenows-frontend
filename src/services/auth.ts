import { reactive } from 'vue'
import api, { checkAuth, parseJwt } from '@/services/api.ts'

type AuthUser = {
  email: string
  authorities: string[]
  issuedAt: number | null
  expiresAt: number | null
  issuer: string
}

function buildUserFromToken(token: string | null): AuthUser | null {
  if (!token) return null

  const payload = parseJwt(token)
  if (!payload) return null

  return {
    email: payload.sub ?? '',
    authorities: payload.roles ?? [],
    issuedAt: payload.iat ?? null,
    expiresAt: payload.exp ?? null,
    issuer: payload.iss ?? '',
  }
}

export const authStore = reactive({
  isAuthenticated: false,
  token: null as string | null,
  refreshToken: null as string | null,
  user: null as AuthUser | null,

  get isAdmin() {
    return this.user?.authorities?.includes('ROLE_ADMIN') ?? false
  },

  async initialize() {
    const savedToken = localStorage.getItem('JWT')
    const savedRefreshToken = localStorage.getItem('REFRESH_TOKEN')

    this.token = savedToken
    this.refreshToken = savedRefreshToken
    this.user = buildUserFromToken(savedToken)

    if (!savedToken || !checkAuth()) {
      if (savedRefreshToken) {
        const refreshed = await this.refreshSession(savedRefreshToken)
        if (refreshed) {
          return
        }
      }

      this.logout()
      return
    }

    try {
      const payload = parseJwt(savedToken)
      const nowInSeconds = Math.floor(Date.now() / 1000)

      if (!payload.exp || payload.exp <= nowInSeconds) {
        if (savedRefreshToken) {
          const refreshed = await this.refreshSession(savedRefreshToken)
          if (refreshed) {
            return
          }
        }

        this.logout()
        return
      }

      this.isAuthenticated = true
      this.user = buildUserFromToken(savedToken)
    } catch {
      if (savedRefreshToken) {
        const refreshed = await this.refreshSession(savedRefreshToken)
        if (refreshed) {
          return
        }
      }

      this.logout()
    }
  },

  async refreshSession(refreshToken: string): Promise<boolean> {
    try {
      const response = await api.post('/api/user/auth/refresh', {
        refresh_token: refreshToken,
      })

      const apiResponse = response.data
      const refreshData = apiResponse.data

      if (refreshData?.JWT) {
        this.setAuthenticated(true, refreshData.JWT, refreshData.RefreshToken ?? refreshToken)
        return true
      }

      this.logout()
      return false
    } catch (error) {
      console.error('Refresh failed:', error)
      this.logout()
      return false
    }
  },

  getRefreshToken(): string | null {
    return this.refreshToken || localStorage.getItem('REFRESH_TOKEN')
  },

  setAuthenticated(auth: boolean, jwtToken: string | null, refreshToken: string | null = null) {
    this.isAuthenticated = auth
    this.token = jwtToken
    this.refreshToken = refreshToken
    this.user = buildUserFromToken(jwtToken)

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
    this.user = null
    localStorage.removeItem('JWT')
    localStorage.removeItem('REFRESH_TOKEN')
  },
})
