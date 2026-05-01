import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false

let refreshQueue: Array<{
  resolve: () => void
  reject: (error: any) => void
}> = []

const processQueue = (error: any = null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve()
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
      url.includes('/api/user/auth/refresh') ||
      url.includes('/api/user/auth/logout')

    const isUnauthorized = status === 401 || status === 403

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
        await api.post('/api/user/auth/refresh')

        processQueue()

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export async function getCurrentUserFromBackend() {
  const response = await api.get('/api/user/auth')
  return response.data?.data ?? null
}

export default api