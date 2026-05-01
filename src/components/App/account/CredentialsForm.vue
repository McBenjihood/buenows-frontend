<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { authStore } from '@/services/auth.ts'
import api from '@/services/api.ts'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const errorMsg = ref<string | null>(null)
const isLoading = ref(false)

const isLogin = computed(() => route.path.includes('login'))
const switchRoute = computed(() => `/auth/${String(route.meta.action_string)}`)

const pageTitle = computed(() =>
  isLogin.value ? t('authPage.loginTitle') : t('authPage.registerTitle'),
)

const submitButtonText = computed(() =>
  isLoading.value
    ? t('authPage.loading')
    : isLogin.value
      ? t('authPage.signIn')
      : t('authPage.register'),
)

const footerInfoText = computed(() =>
  isLogin.value ? t('authPage.noAccount') : t('authPage.haveAccount'),
)

const footerActionText = computed(() =>
  isLogin.value ? t('authPage.createOne') : t('authPage.signInLink'),
)

async function handleSubmit() {
  if (!email.value || !password.value) {
    errorMsg.value = t('authPage.enterEmailPassword')
    return
  }

  if (!isLogin.value && (!firstName.value.trim() || !lastName.value.trim())) {
    errorMsg.value = t('authPage.enterFullName')
    return
  }

  isLoading.value = true
  errorMsg.value = null

  const endpoint = isLogin.value ? '/api/user/auth/login' : '/api/user/auth/register'

  try {
    const payload = isLogin.value
      ? {
        email: email.value,
        password: password.value,
      }
      : {
        email: email.value,
        first_name: firstName.value.trim(),
        last_name: lastName.value.trim(),
        password: password.value,
      }

    await api.post(endpoint, payload)
    await authStore.initialize()

    if (!authStore.isAuthenticated) {
      errorMsg.value = isLogin.value
        ? t('authPage.loginFailedNoJwt')
        : t('authPage.registerFailedNoJwt')
      return
    }

    await router.push('/account')
  } catch (error: any) {
    console.error('API Error:', error)
    errorMsg.value = error.response?.data?.message || t('authPage.connectionFailed')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="solutions-block">
        <h1>{{ pageTitle }}</h1>

        <p v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </p>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <template v-if="!isLogin">
            <div class="name-row">
              <div class="form-group">
                <label for="firstName">{{ t('authPage.firstNameLabel') }}</label>
                <input
                  v-model.trim="firstName"
                  type="text"
                  id="firstName"
                  :placeholder="t('authPage.firstNamePlaceholder')"
                  autocomplete="given-name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="lastName">{{ t('authPage.lastNameLabel') }}</label>
                <input
                  v-model.trim="lastName"
                  type="text"
                  id="lastName"
                  :placeholder="t('authPage.lastNamePlaceholder')"
                  autocomplete="family-name"
                  required
                />
              </div>
            </div>
          </template>

          <div class="form-group">
            <label for="email">{{ t('authPage.emailLabel') }}</label>
            <div class="input-wrapper">
              <img
                src="../../../assets/img/icons/account/login/email.svg"
                class="input-icon"
                alt="Email"
              />
              <input
                v-model.trim="email"
                type="email"
                id="email"
                :placeholder="t('authPage.emailPlaceholder')"
                autocomplete="email"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="password">{{ t('authPage.passwordLabel') }}</label>
              <a href="#" class="sub-text contact-link-small">{{ t('authPage.forgotPassword') }}</a>
            </div>
            <div class="input-wrapper">
              <img
                src="../../../assets/img/icons/account/login/key_vertical.svg"
                class="input-icon"
                alt="Password"
              />
              <input
                v-model="password"
                type="password"
                id="password"
                :placeholder="t('authPage.passwordPlaceholder')"
                autocomplete="current-password"
                required
              />
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ submitButtonText }}
          </button>
        </form>

        <div class="auth-footer">
          <p class="sub-text">
            {{ footerInfoText }}
            <router-link :to="switchRoute" class="contact-link">
              {{ footerActionText }}
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
  max-width: 520px;
}

h1 {
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.error-message {
  color: #ff6b6b;
  margin-bottom: 1rem;
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.name-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
    background-color 0.2s,
    opacity 0.2s;
  margin-top: 0.5rem;
  width: 100%;
}

.submit-btn:hover {
  background-color: #33a06f;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  transform: none;
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

.name-row .form-group input {
  padding: 0.8rem 1rem;
}

@media (max-width: 768px) {
  .solutions-block {
    padding: 2rem;
    max-width: 100%;
  }

  .name-row {
    grid-template-columns: 1fr;
  }
}
</style>
