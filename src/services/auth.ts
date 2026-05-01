import { reactive } from 'vue'
import api, { getCurrentUserFromBackend } from '@/services/api.ts'

type AuthUser = {
  email: string
  authorities: string[]
}

export const authStore = reactive({
  isAuthenticated: false,
  user: null as AuthUser | null,

  get isAdmin() {
    return this.user?.authorities?.includes('ROLE_ADMIN') ?? false
  },

  async initialize() {
    try {
      const userData = await getCurrentUserFromBackend()

      if (!userData) {
        this.clearAuthState()
        return
      }

      this.isAuthenticated = true
      this.user = {
        email: userData.email,
        authorities: userData.authorities ?? [],
      }
    } catch (error) {
      console.error('Auth initialization failed:', error)
      this.clearAuthState()
    }
  },

  setAuthenticated(user: AuthUser | null) {
    this.isAuthenticated = !!user
    this.user = user
  },

  clearAuthState() {
    this.isAuthenticated = false
    this.user = null
  },

  async logout() {
    try {
      await api.post('/api/user/auth/logout')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      this.clearAuthState()
    }
  },
})