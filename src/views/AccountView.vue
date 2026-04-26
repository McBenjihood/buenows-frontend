<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { authStore } from '@/services/auth.ts'
import { useRouter } from 'vue-router'
import api from '@/services/api.ts'

const { t } = useI18n()
const router = useRouter()

const isLoading = ref(true)
const errorMsg = ref('')

const inquiriesLoading = ref(false)
const inquiriesError = ref('')
const inquiries = ref<
  {
    inquiry_id: number
    email: string
    title: string
    message: string
    created_at: string | null
  }[]
>([])

const userProfile = ref<{
  email: string
  authorities: string[]
  issuedAt: number | null
  expiresAt: number | null
  issuer: string
} | null>(null)

const isAdmin = computed(() => authStore.isAdmin)

const openEditor = async () => {
  await router.push('/account/editor')
}

async function handleLogout() {
  authStore.logout()
  await router.push('/auth/login')
}

watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (!isAuth) {
      router.push('/auth/login')
    }
  },
)

async function checkBackendAuth() {
  try {
    await api.get('/api/user/auth')
  } catch (error) {
    console.error('Backend auth check failed:', error)
    errorMsg.value = t('accountPage.sessionError')
  }
}

async function loadAdminInquiries() {
  if (!isAdmin.value) {
    inquiries.value = []
    return
  }

  inquiriesLoading.value = true
  inquiriesError.value = ''

  try {
    const response = await api.get('/api/admin/inquiries')
    inquiries.value = response.data?.data ?? []
  } catch (error: any) {
    console.error('Error loading inquiries:', error)
    inquiriesError.value = error.response?.data?.message || t('accountPage.inquiriesError')
  } finally {
    inquiriesLoading.value = false
  }
}

async function loadCurrentUserFromToken() {
  isLoading.value = true
  errorMsg.value = ''

  try {
    if (!authStore.user) {
      errorMsg.value = t('accountPage.noJwt')
      return
    }

    userProfile.value = {
      email: authStore.user.email,
      authorities: authStore.user.authorities,
      issuedAt: authStore.user.issuedAt,
      expiresAt: authStore.user.expiresAt,
      issuer: authStore.user.issuer,
    }

    await checkBackendAuth()
    await loadAdminInquiries()
  } catch (error) {
    console.error('Error loading user profile:', error)
    errorMsg.value = t('accountPage.profileError')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadCurrentUserFromToken()
})
</script>

<template>
  <section class="account-page">
    <div class="account-wrapper">
      <div class="hero-card">
        <h1>{{ t('accountPage.title') }}</h1>
        <p class="subtitle">
          {{ t('accountPage.subtitle') }}
        </p>
      </div>

      <div v-if="isLoading" class="card">
        <h2>{{ t('accountPage.loadingTitle') }}</h2>
        <p>{{ t('accountPage.loadingText') }}</p>
      </div>

      <div v-else-if="errorMsg" class="card">
        <h2>{{ t('accountPage.errorTitle') }}</h2>
        <p>{{ errorMsg }}</p>
      </div>

      <div v-else class="grid">
        <div class="card">
          <h2>{{ t('accountPage.editorTitle') }}</h2>
          <p>
            {{ t('accountPage.editorText') }}
          </p>
          <button class="primary-button" @click="openEditor">
            {{ t('accountPage.editorButton') }}
          </button>
        </div>

        <div v-if="isAdmin" class="card">
          <h2>{{ t('accountPage.postsTitle') }}</h2>
          <p>
            {{ t('accountPage.postsText') }}
          </p>
          <button class="secondary-button" disabled>{{ t('accountPage.soon') }}</button>
        </div>

        <div v-if="isAdmin" class="card">
          <h2>{{ t('accountPage.designTitle') }}</h2>
          <p>
            {{ t('accountPage.designText') }}
          </p>
          <button class="secondary-button" disabled>{{ t('accountPage.soon') }}</button>
        </div>

        <div class="card">
          <h2>{{ t('accountPage.accountTitle') }}</h2>
          <p>
            <strong>{{ t('accountPage.emailLabel') }}:</strong> {{ userProfile?.email }}
          </p>
          <p>
            <strong>{{ t('accountPage.statusLabel') }}:</strong> {{ t('accountPage.statusActive') }}
          </p>
          <p v-if="userProfile?.authorities?.length">
            <strong>{{ t('accountPage.roleLabel') }}:</strong>
            {{ userProfile.authorities.join(', ') }}
          </p>
        </div>

        <div v-if="!isAdmin" class="card card-wide">
          <h2>{{ t('accountPage.customerAreaTitle') }}</h2>
          <p>
            {{ t('accountPage.customerAreaText') }}
          </p>
        </div>

        <div v-if="isAdmin" class="card card-wide">
          <h2>{{ t('accountPage.inquiriesTitle') }}</h2>
          <p>{{ t('accountPage.inquiriesText') }}</p>

          <p v-if="inquiriesLoading">{{ t('accountPage.inquiriesLoading') }}</p>
          <p v-else-if="inquiriesError" class="error-text">{{ inquiriesError }}</p>
          <p v-else-if="!inquiries.length">{{ t('accountPage.inquiriesEmpty') }}</p>

          <div v-else class="inquiry-list">
            <div v-for="inquiry in inquiries" :key="inquiry.inquiry_id" class="inquiry-item">
              <p>
                <strong>{{ t('accountPage.inquiryEmail') }}:</strong> {{ inquiry.email }}
              </p>
              <p>
                <strong>{{ t('accountPage.inquirySubject') }}:</strong> {{ inquiry.title }}
              </p>
              <p>
                <strong>{{ t('accountPage.inquiryMessage') }}:</strong> {{ inquiry.message }}
              </p>
              <p v-if="inquiry.created_at">
                <strong>{{ t('accountPage.inquiryCreated') }}:</strong> {{ inquiry.created_at }}
              </p>
            </div>
          </div>
        </div>

        <div class="card card-wide">
          <h2>{{ t('accountPage.actionsTitle') }}</h2>
          <p>
            {{ t('accountPage.actionsText') }}
          </p>
          <button class="primary-button" @click="handleLogout">
            {{ t('accountPage.logout') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.account-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
  padding: 4rem 2rem;
}

.account-wrapper {
  max-width: 1100px;
  margin: 0 auto;
}

.hero-card {
  background-color: #252525;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-card h1 {
  margin: 0 0 0.75rem 0;
}

.subtitle {
  margin: 0;
  color: #cfcfcf;
  line-height: 1.6;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.card {
  background-color: #252525;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.card-wide {
  grid-column: 1 / -1;
}

.card h2 {
  margin-top: 0;
  color: #42b883;
  margin-bottom: 1rem;
}

.card p {
  color: #e1e1e1;
  line-height: 1.6;
}

.primary-button {
  margin-top: 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.9rem 1.4rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.primary-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.secondary-button {
  margin-top: 1rem;
  background-color: transparent;
  color: #bdbdbd;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  padding: 0.85rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: not-allowed;
}

.inquiry-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.inquiry-item {
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1rem;
}

.inquiry-item p {
  margin: 0.35rem 0;
  word-break: break-word;
}

.error-text {
  color: #ff7b7b;
  font-weight: 600;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .card-wide {
    grid-column: auto;
  }

  .account-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .card {
    padding: 1.5rem;
  }
}
</style>
