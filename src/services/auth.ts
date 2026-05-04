import { reactive } from 'vue'
import api, { getCurrentUserFromBackend } from '@/services/api.ts'

type AuthUser = {
  user_id?: string
  email: string
  authorities: string[]
}

function normalizeAuthorities(authorities: unknown): string[] {
  return Array.isArray(authorities) ? authorities : []
}

export const authStore = reactive({
  isInitialized: false,
  isAuthenticated: false,
  user: null as AuthUser | null,

  get isAdmin() {
    return this.user?.authorities?.includes('ROLE_ADMIN') ?? false
  },

  async initialize() {
    try {
      const userData = await getCurrentUserFromBackend()

      if (!userData?.email) {
        this.clearAuthState()
        return
      }

      this.isAuthenticated = true
      this.user = {
        user_id: userData.user_id,
        email: userData.email,
        authorities: normalizeAuthorities(userData.authorities),
      }
    } catch (error) {
      console.error('Unexpected auth initialization error:', error)
      this.clearAuthState()
    } finally {
      this.isInitialized = true
    }
  },

  setAuthenticated(user: AuthUser | null) {
    this.isAuthenticated = !!user
    this.user = user
    this.isInitialized = true
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
