<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import api from '@/services/api.ts'
import { authStore } from '@/services/auth.ts'

const { t, locale } = useI18n()
const router = useRouter()

const email = ref('')
const otp = ref('')
const password = ref('')
const confirmPassword = ref('')
const verifiedToken = ref('')
const errorMsg = ref<string | null>(null)
const successMsg = ref<string | null>(null)
const isLoading = ref(false)

const step = ref<1 | 2 | 3>(1)

onMounted(() => {
  if (authStore.user?.email) {
    email.value = authStore.user.email
  }
})

const submitButtonText = computed(() => {
  if (isLoading.value) return t('authPage.loading')
  if (step.value === 1) return t('authPage.requestOtpButton')
  if (step.value === 2) return t('authPage.verifyOtpButton')
  if (step.value === 3) return t('authPage.changePasswordButton')
  return ''
})

async function handleRequestOtp() {
  errorMsg.value = null
  successMsg.value = null

  if (isLoading.value) return

  if (!email.value) {
    errorMsg.value = t('authPage.enterEmailPassword')
    return
  }

  isLoading.value = true

  try {
    await api.post('/api/user/request-otp', { contact_information: email.value, language: locale.value })
    step.value = 2
  } catch (error: any) {
    console.error('API Error:', error)
    errorMsg.value = error.response?.data?.message || t('authPage.connectionFailed')
  } finally {
    isLoading.value = false
  }
}

async function handleVerifyOtp() {
  errorMsg.value = null

  if (isLoading.value) return

  const trimmedOtp = otp.value.trim()

  if (!trimmedOtp) {
    errorMsg.value = 'Bitte gib den Code ein.'
    return
  }

  if (!/^\d{6}$/.test(trimmedOtp)) {
    errorMsg.value = 'Der Code muss aus 6 Zahlen bestehen.'
    return
  }

  isLoading.value = true

  try {
    const response = await api.post('/api/user/verify-otp', {
      contact_information: email.value,
      otp: trimmedOtp,
    })

    const token = response.data.data?.verified_token || response.data?.verified_token

    if (!token) {
      errorMsg.value = 'Der Bestätigungstoken fehlt. Bitte versuche es erneut.'
      return
    }

    verifiedToken.value = token
    step.value = 3
  } catch (error: any) {
    console.error('API Error:', error)
    errorMsg.value = error.response?.data?.message || t('authPage.connectionFailed')
  } finally {
    isLoading.value = false
  }
}

async function handleChangePassword() {
  errorMsg.value = null

  if (isLoading.value) return

  if (!verifiedToken.value) {
    errorMsg.value = 'Deine Bestätigung ist abgelaufen oder ungültig. Bitte starte den Vorgang neu.'
    step.value = 1
    return
  }

  if (!password.value || !confirmPassword.value) {
    errorMsg.value = 'Bitte fülle beide Passwortfelder aus.'
    return
  }

  if (password.value.length < 8) {
    errorMsg.value = 'Das Passwort muss mindestens 8 Zeichen lang sein.'
    return
  }

  if (password.value.length > 128) {
    errorMsg.value = 'Das Passwort ist zu lang.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = t('authPage.passwordsDoNotMatch')
    return
  }

  isLoading.value = true

  try {
    await api.post('/api/user/change-password', {
      password: password.value,
      verified_token: verifiedToken.value,
    })

    resetForm()
    await authStore.logout()
    await router.push({ path: '/auth/login', query: { resetSuccess: 'true' } })
  } catch (error: any) {
    console.error('API Error:', error)
    errorMsg.value = error.response?.data?.message || t('authPage.connectionFailed')
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  otp.value = ''
  password.value = ''
  confirmPassword.value = ''
  verifiedToken.value = ''
  step.value = 1
}

async function handleSubmit() {
  if (step.value === 1) {
    await handleRequestOtp()
  } else if (step.value === 2) {
    await handleVerifyOtp()
  } else if (step.value === 3) {
    await handleChangePassword()
  }
}
</script>

<template>
  <div class="password-reset-component">
    <p v-if="errorMsg" class="error-message">
      {{ errorMsg }}
    </p>

    <p v-if="successMsg" class="success-message">
      {{ successMsg }}
    </p>

    <form class="reset-form" @submit.prevent="handleSubmit">
      <div v-if="step === 1" class="form-content">
        <p class="step-description">
          {{ t('authPage.resetPasswordSubtitle') }}
        </p>
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
              disabled
            />
          </div>
        </div>
      </div>

      <div v-if="step === 2" class="form-content">
        <p class="step-description">
          {{ t('authPage.verifyOtpSubtitle') }}
        </p>
        <p class="mail-hint">
          {{ t('authPage.checkSpamHint') }}
        </p>
        <div class="form-group">
          <label for="otp">{{ t('authPage.otpLabel') }}</label>
          <div class="input-wrapper">
            <input
              v-model.trim="otp"
              type="text"
              id="otp"
              :placeholder="t('authPage.otpPlaceholder')"
              inputmode="numeric"
              autocomplete="one-time-code"
              maxlength="6"
              pattern="[0-9]{6}"
              required
            />
          </div>
        </div>
      </div>

      <div v-if="step === 3" class="form-content">
        <p class="step-description">
          {{ t('authPage.newPasswordSubtitle') }}
        </p>
        <div class="form-group">
          <label for="password">{{ t('authPage.newPasswordLabel') }}</label>
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
              minlength="8"
              maxlength="128"
              required
            />
          </div>
        </div>

        <div class="form-group mt-1">
          <label for="confirmPassword">{{ t('authPage.confirmPasswordLabel') }}</label>
          <div class="input-wrapper">
            <img
              src="../../../assets/img/icons/account/login/key_vertical.svg"
              class="input-icon"
              alt="Confirm Password"
            />
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              :placeholder="t('authPage.passwordPlaceholder')"
              minlength="8"
              maxlength="128"
              required
            />
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="primary-button" :disabled="isLoading">
          {{ submitButtonText }}
        </button>
        <button
          v-if="step > 1"
          type="button"
          class="secondary-button"
          @click="resetForm"
          :disabled="isLoading"
        >
          {{ t('accountPage.cancel') }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.password-reset-component {
  margin-top: 1rem;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-description {
  color: #cfcfcf;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.mail-hint {
  color: #b8b8b8;
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 0.85rem 1rem;
  margin: 0 0 1.5rem 0;
  font-size: 0.85rem;
  line-height: 1.5;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #42b883;
  font-size: 0.9rem;
  font-weight: 600;
}

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

.input-wrapper input {
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

.input-wrapper input:focus {
  outline: none;
  border-color: #42b883;
}

.input-wrapper input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

#otp {
  padding-left: 1rem;
  text-align: center;
  letter-spacing: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.primary-button {
  background-color: #42b883;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    background-color 0.2s,
    opacity 0.2s;
}

.primary-button:hover:not(:disabled) {
  background-color: #33a06f;
  transform: translateY(-2px);
}

.primary-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.secondary-button {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.secondary-button:hover:not(:disabled) {
  background-color: #333;
  border-color: #444;
}

.error-message {
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.success-message {
  color: #42b883;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.mt-1 {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
}
</style>
