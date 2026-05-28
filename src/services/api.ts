import axios, { type InternalAxiosRequestConfig } from 'axios'
import i18n from '@/i18n/index.ts'

const DEFAULT_API_BASE_URL = 'https://api.bueno-ws.ch'
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '')
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

const cookieAuthApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

type CsrfToken = {
  headerName: string
  token: string
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

function getJwtFromResponseData(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null

  const responseData = data as {
    data?: {
      JWT?: string
      jwt?: string
    }
  }

  return responseData.data?.JWT || responseData.data?.jwt || null
}

export async function getCsrfToken(): Promise<CsrfToken> {
  const response = await cookieAuthApi.get('/api/user/auth/csrf')
  const headerName = response.data?.data?.header_name
  const token = response.data?.data?.token

  if (!headerName || !token) {
    throw new Error('CSRF token response is missing header_name or token.')
  }

  return {
    headerName,
    token,
  }
}

export async function refreshAuth() {
  const csrf = await getCsrfToken()
  const response = await cookieAuthApi.post('/api/user/auth/refresh', undefined, {
    headers: {
      [csrf.headerName]: csrf.token,
    },
  })

  const jwt = getJwtFromResponseData(response.data)
  if (jwt) {
    setLocalAccessToken(jwt)
  }

  return response
}

export async function logoutAuth() {
  const csrf = await getCsrfToken()

  await cookieAuthApi.post('/api/user/auth/logout', undefined, {
    headers: {
      [csrf.headerName]: csrf.token,
    },
  })
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
      const jwt = getJwtFromResponseData(response.data)
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
        const refreshResponse = await refreshAuth()
        const newJwt = getJwtFromResponseData(refreshResponse.data)

        if (newJwt) {
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
