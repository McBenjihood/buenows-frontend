<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { authStore } from '@/services/auth.ts'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const isLoading = ref(true)
const errorMsg = ref('')

const userProfile = ref<{
  email: string
  authorities: string[]
} | null>(null)

const isAdmin = computed(() => authStore.isAdmin)

const openEditor = async () => {
  await router.push('/account/editor')
}

const openUsers = async () => {
  await router.push('/account/admin/users')
}

const openInquiries = async () => {
  await router.push('/account/admin/inquiries')
}

async function handleLogout() {
  await authStore.logout()
  await router.push('/auth/login')
}

watch(
  () => authStore.isAuthenticated,
  async (isAuth) => {
    if (!isAuth) {
      await router.push('/auth/login')
    }
  },
)

async function loadCurrentUser() {
  isLoading.value = true
  errorMsg.value = ''

  try {
    await authStore.initialize()

    if (!authStore.user) {
      errorMsg.value = t('accountPage.noJwt')
      return
    }

    userProfile.value = {
      email: authStore.user.email,
      authorities: authStore.user.authorities,
    }
  } catch (error) {
    console.error('Error loading user profile:', error)
    errorMsg.value = t('accountPage.profileError')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadCurrentUser()
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
          <h2>{{ t('accountPage.usersTitle') }}</h2>
          <p>{{ t('accountPage.usersText') }}</p>
          <button class="primary-button" @click="openUsers">
            {{ t('accountPage.usersOpenButton') }}
          </button>
        </div>

        <div v-if="isAdmin" class="card">
          <h2>{{ t('accountPage.inquiriesTitle') }}</h2>
          <p>{{ t('accountPage.inquiriesText') }}</p>
          <button class="primary-button" @click="openInquiries">
            {{ t('accountPage.inquiriesOpenButton') }}
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
          <div class="info-row">
            <img src="../assets/img/icons/account/login/email.svg" class="info-icon" alt="Email" />
            <p>
              <strong>{{ t('accountPage.emailLabel') }}:</strong> {{ userProfile?.email }}
            </p>
          </div>
          <div class="info-row">
            <img src="../assets/img/icons/account/login/check.svg" class="info-icon" alt="Status" />
            <p>
              <strong>{{ t('accountPage.statusLabel') }}:</strong> {{ t('accountPage.statusActive') }}
            </p>
          </div>
        </div>

        <div v-if="!isAdmin" class="card card-wide">
          <h2>{{ t('accountPage.customerAreaTitle') }}</h2>
          <p>
            {{ t('accountPage.customerAreaText') }}
          </p>
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

.info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.info-row p {
  margin: 0;
}

.info-icon {
  height: 1.2rem;
  width: auto;
  opacity: 0.8;
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
