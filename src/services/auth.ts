import { reactive } from 'vue'
import { checkAuth } from '@/services/api.ts'

export const authStore = reactive({
  isAuthenticated: false,


  initialize() {
    this.isAuthenticated = checkAuth()
  }
})
