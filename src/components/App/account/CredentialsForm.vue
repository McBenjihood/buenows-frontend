<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
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
const otp = ref('')
const verifiedToken = ref('')
const errorMsg = ref<string | null>(null)
const successMsg = ref<string | null>(null)
const isLoading = ref(false)
const step = ref<1 | 2>(1)
const showDuplicateUserModal = ref(false)

const isLogin = computed(() => route.path.includes('login'))
const switchRoute = computed(() => `/auth/${String(route.meta.action_string)}`)

watch(isLogin, () => {
  step.value = 1
  otp.value = ''
  verifiedToken.value = ''
  errorMsg.value = null
  successMsg.value = null
})

onMounted(() => {
  if (route.query.resetSuccess === 'true') {
    successMsg.value = t('authPage.resetSuccessMessage')
    router.replace({ query: {} })
  }
})

const passwordAutocomplete = computed(() => (isLogin.value ? 'current-password' : 'new-password'))

const pageTitle = computed(() => {
  if (isLogin.value) return t('authPage.loginTitle')
  if (step.value === 1) return t('authPage.registerTitle')
  return t('authPage.verifyOtpTitle')
})

const pageSubtitle = computed(() => {
  if (!isLogin.value && step.value === 2) return t('authPage.verifyOtpSubtitle')
  return ''
})

const showMailHint = computed(() => {
  return !isLogin.value && step.value === 2
})

const submitButtonText = computed(() => {
  if (isLoading.value) return t('authPage.loading')
  if (isLogin.value) return t('authPage.signIn')
  if (step.value === 1) return t('authPage.requestOtpButton')
  return t('authPage.verifyOtpButton')
})

const footerInfoText = computed(() =>
  isLogin.value ? t('authPage.noAccount') : t('authPage.haveAccount'),
)

const footerActionText = computed(() =>
  isLogin.value ? t('authPage.createOne') : t('authPage.signInLink'),
)

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function handleRequestOtp() {
  const trimmedEmail = email.value.trim()
  const trimmedFirstName = firstName.value.trim()
  const trimmedLastName = lastName.value.trim()

  if (!trimmedEmail || !password.value) {
    errorMsg.value = t('authPage.enterEmailPassword')
    return false
  }

  if (!validateEmail(trimmedEmail)) {
    errorMsg.value = 'Bitte gib eine gültige E-Mail-Adresse ein.'
    return false
  }

  if (trimmedEmail.length > 254) {
    errorMsg.value = 'Die E-Mail-Adresse ist zu lang.'
    return false
  }

  if (!trimmedFirstName || !trimmedLastName) {
    errorMsg.value = t('authPage.enterFullName')
    return false
  }

  if (trimmedFirstName.length > 50) {
    errorMsg.value = 'Der Vorname ist zu lang.'
    return false
  }

  if (trimmedLastName.length > 50) {
    errorMsg.value = 'Der Nachname ist zu lang.'
    return false
  }

  if (password.value.length < 8) {
    errorMsg.value = 'Das Passwort muss mindestens 8 Zeichen lang sein.'
    return false
  }

  if (password.value.length > 128) {
    errorMsg.value = 'Das Passwort ist zu lang.'
    return false
  }

  isLoading.value = true

  try {
    await api.post('/api/user/request-otp', { contact_information: trimmedEmail })
    step.value = 2
    return true
  } catch (error: any) {
    console.error('API Error:', error)
    errorMsg.value = error.response?.data?.message || t('authPage.connectionFailed')
    return false
  } finally {
    isLoading.value = false
  }
}

function isDuplicateUserError(error: any): boolean {
  const data = error?.response?.data
  if (!data) return false

  if (typeof data === 'string') {
    const lower = data.toLowerCase()
    if (lower.includes('already exists') || lower.includes('duplicate_user')) {
      return true
    }
  }

  if (typeof data === 'object') {
    const msg = (data.message || '').toLowerCase()
    const err = (data.error || '').toLowerCase()
    const code = (data.code || '').toLowerCase()
    
    if (
      msg.includes('already exists') ||
      msg.includes('duplicate') ||
      err.includes('already exists') ||
      err.includes('duplicate') ||
      code.includes('already exists') ||
      code.includes('duplicate')
    ) {
      return true
    }
  }

  return false
}

async function navigateToLogin() {
  showDuplicateUserModal.value = false
  await router.push('/auth/login')
}

async function handleVerifyOtpAndRegister() {
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

  isLoading.value = true

  try {
    const verifyResponse = await api.post('/api/user/verify-otp', {
      contact_information: trimmedEmail,
      otp: trimmedOtp,
    })

    const token = verifyResponse.data.data?.verified_token || verifyResponse.data?.verified_token

    if (!token) {
      errorMsg.value = 'Der Bestätigungstoken fehlt. Bitte versuche es erneut.'
      isLoading.value = false
      return
    }

    verifiedToken.value = token

    // Proceed with registration
    await api.post('/api/user/auth/register', {
      first_name: firstName.value.trim(),
      last_name: lastName.value.trim(),
      password: password.value,
      verified_token: verifiedToken.value,
    })

    await authStore.initialize()

    if (!authStore.isAuthenticated) {
      errorMsg.value = t('authPage.registerFailedNoJwt')
      isLoading.value = false
      return
    }

    await router.push('/account')
  } catch (error: any) {
    console.error('API Error:', error)
    if (isDuplicateUserError(error)) {
      showDuplicateUserModal.value = true
    } else {
      errorMsg.value = error.response?.data?.message || t('authPage.connectionFailed')
    }
  } finally {
    isLoading.value = false
  }
}

async function handleLogin() {
  const trimmedEmail = email.value.trim()

  if (!trimmedEmail || !password.value) {
    errorMsg.value = t('authPage.enterEmailPassword')
    return
  }

  if (!validateEmail(trimmedEmail)) {
    errorMsg.value = 'Bitte gib eine gültige E-Mail-Adresse ein.'
    return
  }

  if (trimmedEmail.length > 254) {
    errorMsg.value = 'Die E-Mail-Adresse ist zu lang.'
    return
  }

  isLoading.value = true

  try {
    await api.post('/api/user/auth/login', {
      email: trimmedEmail,
      password: password.value,
    })

    await authStore.initialize()

    if (!authStore.isAuthenticated) {
      errorMsg.value = t('authPage.loginFailedNoJwt')
      isLoading.value = false
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

async function handleSubmit() {
  errorMsg.value = null

  if (isLoading.value) {
    return
  }

  if (isLogin.value) {
    await handleLogin()
  } else {
    if (step.value === 1) {
      await handleRequestOtp()
    } else if (step.value === 2) {
      await handleVerifyOtpAndRegister()
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="solutions-block">
        <h1>{{ pageTitle }}</h1>

        <p class="subtitle" v-if="pageSubtitle">
          {{ pageSubtitle }}
        </p>

        <p v-if="showMailHint" class="mail-hint">
          {{ t('authPage.checkSpamHint') }}
        </p>

        <p v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </p>

        <p v-if="successMsg" class="success-message">
          {{ successMsg }}
        </p>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <template v-if="!isLogin && step === 2">
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
          </template>

          <template v-else>
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
                    maxlength="50"
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
                    maxlength="50"
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
                  maxlength="254"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label for="password">{{ t('authPage.passwordLabel') }}</label>
                <router-link
                  v-if="isLogin"
                  to="/auth/reset-password"
                  class="sub-text contact-link-small"
                  >{{ t('authPage.forgotPassword') }}</router-link
                >
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
                  :autocomplete="passwordAutocomplete"
                  minlength="8"
                  maxlength="128"
                  required
                />
              </div>
            </div>
          </template>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ submitButtonText }}
          </button>

          <p class="privacy-note">
            {{ t('authPage.privacyNotice') }}
            <router-link to="/legal">{{ t('footer.legal') }}</router-link>
          </p>
        </form>

        <div class="auth-footer" v-if="!(!isLogin && step === 2)">
          <p class="sub-text">
            {{ footerInfoText }}
            <router-link :to="switchRoute" class="contact-link">
              {{ footerActionText }}
            </router-link>
          </p>
        </div>
      </div>
    </div>

    <!-- Duplicate User Premium Modal -->
    <Transition name="modal">
      <div v-if="showDuplicateUserModal" class="modal-overlay" @click.self="showDuplicateUserModal = false">
        <div class="modal-box">
          <div class="modal-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#42b883" stroke-width="2" class="modal-icon">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 class="modal-title">{{ t('authPage.duplicateTitle') }}</h2>
          <p class="modal-description">{{ t('authPage.duplicateDescription') }}</p>
          <div class="modal-buttons">
            <button type="button" @click="showDuplicateUserModal = false" class="modal-btn secondary">
              {{ t('authPage.duplicateCancel') }}
            </button>
            <button type="button" @click="navigateToLogin" class="modal-btn primary">
              {{ t('authPage.duplicateLogin') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
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
  margin: 0 0 1.5rem 0;
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
  color: #42b883;
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

.privacy-note {
  margin: -0.25rem 0 0;
  color: #a7a7a7;
  font-size: 0.85rem;
  line-height: 1.5;
  text-align: center;
}

.privacy-note a {
  color: #42b883;
  text-decoration: none;
}

.privacy-note a:hover {
  text-decoration: underline;
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

/* Premium Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-box {
  background-color: #252525;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 3rem 2.5rem 2.5rem;
  width: 92%;
  max-width: 460px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
  text-align: center;
  box-sizing: border-box;
}

.modal-icon-wrapper {
  width: 72px;
  height: 72px;
  background-color: rgba(66, 184, 131, 0.08);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.75rem;
  box-shadow: 0 0 24px rgba(66, 184, 131, 0.1);
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(66, 184, 131, 0.2);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(66, 184, 131, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(66, 184, 131, 0);
  }
}

.modal-icon {
  width: 36px;
  height: 36px;
}

.modal-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.85rem;
  letter-spacing: -0.02em;
}

.modal-description {
  font-size: 0.95rem;
  color: #a7a7a7;
  line-height: 1.6;
  margin: 0 0 2.25rem;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
}

.modal-btn {
  flex: 1;
  padding: 0.9rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  font-family: inherit;
}

.modal-btn.primary {
  background-color: #42b883;
  color: #1a1a1a;
  box-shadow: 0 4px 14px rgba(66, 184, 131, 0.2);
}

.modal-btn.primary:hover {
  background-color: #33a06f;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.35);
}

.modal-btn.primary:active {
  transform: translateY(0);
}

.modal-btn.secondary {
  background-color: #1a1a1a;
  border: 1px solid #333;
  color: #b8b8b8;
}

.modal-btn.secondary:hover {
  border-color: #555;
  color: #ffffff;
  background-color: #222;
  transform: translateY(-2px);
}

.modal-btn.secondary:active {
  transform: translateY(0);
}

/* Modal Transition Animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-box,
.modal-leave-active .modal-box {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  transform: scale(0.9) translateY(-30px);
}

@media (max-width: 480px) {
  .modal-box {
    padding: 2.25rem 1.5rem 1.75rem;
  }
  .modal-buttons {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
  .modal-btn {
    width: 100%;
  }
}
</style>
