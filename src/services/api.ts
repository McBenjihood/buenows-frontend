import axios, { type InternalAxiosRequestConfig } from 'axios'
import i18n from '@/i18n/index.ts'

const API_BASE_URL = 'http://localhost:8080'
const TOKEN_KEY = 'access_token'

export function getLocalAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setLocalAccessToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearLocalAccessToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

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
    const token = getLocalAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
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
      const jwt = response.data?.data?.JWT || response.data?.data?.jwt
      if (jwt) {
        setLocalAccessToken(jwt)
      }
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

    const isUnauthorized = status === 401

    if (isUnauthorized && !isAuthRoute && !originalRequest._retry) {
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
        const refreshResponse = await api.post('/api/user/auth/refresh')
        const newJwt = refreshResponse.data?.data?.JWT || refreshResponse.data?.data?.jwt

        if (newJwt) {
          setLocalAccessToken(newJwt)
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newJwt}`
          }
        }

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
