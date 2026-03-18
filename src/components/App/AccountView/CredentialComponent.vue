<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authStore } from '@/assets/ts/auth.ts'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref<string | null>(null)
const isLoading = ref(false)

const switchRoute = computed(() => `/account/${String(route.meta.action_string)}`)

async function handleSubmit() {
  if (!email.value || !password.value) {
    errorMsg.value = 'Please enter email and password.'
    return
  }

  isLoading.value = true
  errorMsg.value = null

  const isLogin = route.path.includes('login')
  const endpoint = isLogin ? '/api/user/auth/login' : '/api/user/auth/register'

  try {
    const response = await api.post(endpoint, {
      email: email.value,
      password: password.value,
    })

    const apiResponse = response.data
    const loginData = apiResponse.data

    if (isLogin) {
      if (loginData && loginData.JWTToken) {
        authStore.setAuthenticated(true, loginData.JWTToken)
        console.log('Login success:', apiResponse.message)
        router.push('/')
      } else {
        errorMsg.value = 'Login failed: No JWTToken received from server.'
      }
    } else {
      alert('Registration successful! Please login.')
      router.push('/account/login')
    }
  } catch (error: any) {
    console.error('API Error:', error)
    errorMsg.value = error.response?.data?.message || 'Connection to server failed.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="solutions-block">
        <h1>{{ $route.meta.title }}</h1>

        <p v-if="errorMsg" style="color: #ff6b6b; margin-bottom: 1rem; text-align: center">
          {{ errorMsg }}
        </p>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="input-wrapper">
              <img
                src="@/assets/img/icons/account/login/email.svg"
                class="input-icon"
                alt="Email"
              />
              <input
                v-model.trim="email"
                type="email"
                id="email"
                placeholder="name@company.com"
                autocomplete="email"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="password">Password</label>
              <a href="#" class="sub-text contact-link-small">Forgot password?</a>
            </div>
            <div class="input-wrapper">
              <img
                src="@/assets/img/icons/account/login/key_vertical.svg"
                class="input-icon"
                alt="Password"
              />
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Loading...' : $route.meta.button_text }}
          </button>
        </form>

        <div class="auth-footer">
          <p class="sub-text">
            {{ $route.meta.info_text }}
            <router-link :to="switchRoute" class="contact-link">
              {{ $route.meta.action_button }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.85rem;
  height: 1.2rem;
  width: auto;
  opacity: 0.7;
  pointer-events: none;
}

.container {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Google Sans', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0.5em;
  min-height: 100%;
}

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 1em;
}

.solutions-block {
  background-color: #252525;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
}

h1 {
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.form-group label {
  color: #42b883;
  font-size: 0.9rem;
  font-weight: 600;
}

.form-group input {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.8rem 1rem 0.8rem 2.8rem;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #42b883;
}

.submit-btn {
  background-color: #42b883;
  color: #1a1a1a;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    background-color 0.2s;
  margin-top: 0.5rem;
  width: 100%;
}

.submit-btn:hover {
  background-color: #33a06f;
  transform: translateY(-2px);
}

.auth-footer {
  margin-top: 1.25rem;
  text-align: center;
}

.contact-link {
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #33a06f;
}

.contact-link-small {
  font-size: 0.85rem;
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
}

.contact-link-small:hover {
  color: #42b883;
}

.sub-text {
  font-size: 0.9rem;
  color: #888;
}

@media (max-width: 768px) {
  .solutions-block {
    padding: 2rem;
    max-width: 100%;
  }
}
</style>