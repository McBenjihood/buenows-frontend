import axios, { type InternalAxiosRequestConfig } from 'axios'
import i18n from '@/i18n/index.ts'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080').replace(/\/$/, '')
const TOKEN_KEY = 'access_token'

export function getLocalAccessToken(): string | null {
  return null
}

export function setLocalAccessToken(_token: string): void {
  clearLocalAccessToken()
}

export function clearLocalAccessToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Ignore storage access errors; auth uses HttpOnly cookies.
  }
}

clearLocalAccessToken()

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})



type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

let isRefreshing = false

let refreshQueue: Array<{
  resolve: () => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown = null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve()
    }
  })

  refreshQueue = []
}

// Request Interceptor to automatically attach Bearer token
api.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = i18n.global.locale.value
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response Interceptor to capture JWTs on successful auth/refresh and handle 401 retries
api.interceptors.response.use(
  (response) => {
    const url = response.config.url ?? ''
    const isAuthSuccessRoute =
      url.includes('/api/user/auth/login') ||
      url.includes('/api/user/auth/register') ||
      url.includes('/api/user/auth/refresh')

    if (isAuthSuccessRoute && response.data?.successful) {
      clearLocalAccessToken()
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config as RetryRequestConfig | undefined

    if (!originalRequest) {
      return Promise.reject(error)
    }

    const status = error.response?.status
    const url = originalRequest.url ?? ''

    if (status === 429) {
      if (!error.response) error.response = {}
      if (!error.response.data) error.response.data = {}
      error.response.data.message = i18n.global.t('authPage.rateLimited')
      return Promise.reject(error)
    }

    const isAuthRoute =
      url.includes('/api/user/auth/login') ||
      url.includes('/api/user/auth/register') ||
      url.includes('/api/user/auth/refresh') ||
      url.includes('/api/user/auth/logout')

    const isAuthFailure = status === 401 || status === 403

    if (isAuthFailure && !isAuthRoute && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: () => {
              resolve(api(originalRequest))
            },
            reject,
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await api.post('/api/user/auth/refresh')

        processQueue()

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        clearLocalAccessToken()

        window.dispatchEvent(new Event('auth:logout'))

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export async function getCurrentUserFromBackend() {
  try {
    const response = await api.get('/api/user/auth')
    return response.data?.data ?? null
  } catch (error: any) {
    const status = error.response?.status

    if (status === 401 || status === 403) {
      return null
    }

    throw error
  }
}

export default api
