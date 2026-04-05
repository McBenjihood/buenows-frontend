import axios from 'axios'
import { authStore } from '@/services/auth.ts'

export function checkAuth(): boolean {
  return !!localStorage.getItem('JWT')
}

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('JWT')
  const url = config.url ?? ''

  const isAuthRoute =
    url.includes('/api/user/auth/login') ||
    url.includes('/api/user/auth/register') ||
    url.includes('/api/user/auth/refresh')

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

let isRefreshing = false
let refreshQueue: Array<{
  resolve: (token: string) => void
  reject: (error: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else if (token) {
      resolve(token)
    }
  })

  refreshQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status
    const url = originalRequest?.url ?? ''

    const isAuthRoute =
      url.includes('/api/user/auth/login') ||
      url.includes('/api/user/auth/register') ||
      url.includes('/api/user/auth/refresh')

    if (status === 401 && !isAuthRoute && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = originalRequest.headers ?? {}
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(api(originalRequest))
            },
            reject: (err: any) => {
              reject(err)
            },
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = authStore.getRefreshToken()

        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        const refreshed = await authStore.refreshSession(refreshToken)

        if (!refreshed) {
          throw new Error('Refresh failed')
        }

        const newToken = localStorage.getItem('JWT')

        if (!newToken) {
          throw new Error('No new JWT after refresh')
        }

        processQueue(null, newToken)

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        authStore.logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export function getStoredToken(): string | null {
  return localStorage.getItem('JWT')
}

export function parseJwt(token: string): any | null {
  try {
    const parts = token.split('.')

    if (parts.length !== 3 || !parts[1]) {
      throw new Error('Invalid JWT format')
    }

    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => `%${('00' + char.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Failed to parse JWT, clearing tokens', error)
    localStorage.removeItem('JWT')
    localStorage.removeItem('REFRESH_TOKEN')
    return null
  }
}

export function getCurrentUserFromToken() {
  const token = getStoredToken()

  if (!token) {
    return null
  }

  const payload = parseJwt(token)

  if (!payload) {
    return null
  }

  return {
    email: payload.sub ?? '',
    authorities: payload.roles ?? [],
    issuedAt: payload.iat ?? null,
    expiresAt: payload.exp ?? null,
    issuer: payload.iss ?? '',
  }
}

export default api