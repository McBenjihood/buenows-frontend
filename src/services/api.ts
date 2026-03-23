import axios from 'axios'

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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function getStoredToken(): string | null {
  return localStorage.getItem('JWT')
}

export function parseJwt(token: string): any {
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
}

export function getCurrentUserFromToken() {
  const token = getStoredToken()

  if (!token) {
    return null
  }

  const payload = parseJwt(token)

  return {
    email: payload.sub ?? '',
    authorities: payload.roles ?? [],
    issuedAt: payload.iat ?? null,
    expiresAt: payload.exp ?? null,
    issuer: payload.iss ?? '',
  }
}

export default api
