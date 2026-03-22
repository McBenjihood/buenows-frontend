import axios from 'axios'

export function checkAuth() {
  return !!localStorage.getItem('JWT');
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

export default api
