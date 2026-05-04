<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import api from '@/services/api.ts'

const { t } = useI18n()

const email = ref('')
const otp = ref('')
const password = ref('')
const confirmPassword = ref('')
const verifiedToken = ref('')
const errorMsg = ref<string | null>(null)
const isLoading = ref(false)

const step = ref<1 | 2 | 3 | 4>(1)

const pageTitle = computed(() => {
  if (step.value === 1) return t('authPage.resetPasswordTitle')
  if (step.value === 2) return t('authPage.verifyOtpTitle')
  if (step.value === 3) return t('authPage.newPasswordTitle')
  return t('authPage.resetPasswordTitle')
})

const pageSubtitle = computed(() => {
  if (step.value === 1) return t('authPage.resetPasswordSubtitle')
  if (step.value === 2) return t('authPage.verifyOtpSubtitle')
  if (step.value === 3) return t('authPage.newPasswordSubtitle')
  return ''
})

const showMailHint = computed(() => {
  return step.value === 1 || step.value === 2
})

const submitButtonText = computed(() => {
  if (isLoading.value) return t('authPage.loading')
  if (step.value === 1) return t('authPage.requestOtpButton')
  if (step.value === 2) return t('authPage.verifyOtpButton')
  if (step.value === 3) return t('authPage.changePasswordButton')
  return ''
})

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function handleRequestOtp() {
  errorMsg.value = null

  if (isLoading.value) {
    return
  }

  const trimmedEmail = email.value.trim()

  if (!trimmedEmail) {
    errorMsg.value = t('authPage.enterEmailPassword')
    return
  }

  if (!isValidEmail(trimmedEmail)) {
    errorMsg.value = 'Bitte gib eine gültige E-Mail-Adresse ein.'
    return
  }

  if (trimmedEmail.length > 254) {
    errorMsg.value = 'Die E-Mail-Adresse ist zu lang.'
    return
  }

  isLoading.value = true

  try {
    await api.post('/api/user/request-otp', { email: trimmedEmail })
    email.value = trimmedEmail
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

  if (isLoading.value) {
    return
  }

  const trimmedOtp = otp.value.trim()
  const trimmedEmail = email.value.trim()

  if (!trimmedOtp) {
    errorMsg.value = 'Bitte gib den Code ein.'
    return
  }

  if (!/^\d{6}$/.test(trimmedOtp)) {
    errorMsg.value = 'Der Code muss aus 6 Zahlen bestehen.'
    return
  }

  if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
    errorMsg.value = 'Die E-Mail-Adresse ist ungültig. Bitte starte den Vorgang neu.'
    step.value = 1
    return
  }

  isLoading.value = true

  try {
    const response = await api.post('/api/user/verify-otp', {
      email: trimmedEmail,
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

  if (isLoading.value) {
    return
  }

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

    email.value = ''
    otp.value = ''
    password.value = ''
    confirmPassword.value = ''
    verifiedToken.value = ''

    step.value = 4
  } catch (error: any) {
    console.error('API Error:', error)
    errorMsg.value = error.response?.data?.message || t('authPage.connectionFailed')
  } finally {
    isLoading.value = false
  }
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
  <div class="container">
    <div class="login-wrapper">
      <div class="solutions-block">
        <h1>{{ pageTitle }}</h1>

        <p class="subtitle" v-if="step !== 4">
          {{ pageSubtitle }}
        </p>

        <p v-if="showMailHint" class="mail-hint">
          {{ t('authPage.checkSpamHint') }}
        </p>

        <p v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </p>

        <div v-if="step === 4" class="success-message">
          <p>{{ t('authPage.resetSuccessMessage') }}</p>
          <router-link to="/auth/login" class="submit-btn text-center d-block">
            {{ t('authPage.backToLogin') }}
          </router-link>
        </div>

        <form v-else class="contact-form" @submit.prevent="handleSubmit">
          <div v-if="step === 1" class="form-group">
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
                maxlength="254"
                required
              />
            </div>
          </div>

          <div v-if="step === 2" class="form-group">
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

          <div v-if="step === 3" class="form-group">
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
                autocomplete="new-password"
                minlength="8"
                maxlength="128"
                required
              />
            </div>
          </div>

          <div v-if="step === 3" class="form-group">
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
                autocomplete="new-password"
                minlength="8"
                maxlength="128"
                required
              />
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ submitButtonText }}
          </button>
        </form>

        <div class="auth-footer" v-if="step !== 4">
          <p class="sub-text">
            <router-link to="/auth/login" class="contact-link">
              {{ t('authPage.backToLogin') }}
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
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.subtitle {
  text-align: center;
  color: #888;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.mail-hint {
  color: #b8b8b8;
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 0.85rem 1rem;
  margin: 0 0 2rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
}

.error-message {
  color: #ff6b6b;
  margin-bottom: 1rem;
  text-align: center;
}

.success-message {
  text-align: center;
}

.success-message p {
  color: #42b883;
  margin-bottom: 2rem;
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

.form-group label {
  color: #42b883;
  font-size: 0.9rem;
  font-weight: 600;
}

.form-group input {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.8rem 1rem 0.8rem 1rem;
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

.input-wrapper img + input {
  padding-left: 2.8rem;
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

.submit-btn.d-block {
  display: block;
  text-decoration: none;
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
