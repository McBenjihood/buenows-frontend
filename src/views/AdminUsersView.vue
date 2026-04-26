<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '@/services/api.ts'

const { t } = useI18n()
const router = useRouter()

const isLoading = ref(true)
const errorMsg = ref('')
const openUserId = ref<string | null>(null)

const adminUsers = ref<
  {
    user_id: string
    email: string
    first_name: string | null
    last_name: string | null
    authorities: string[]
    created_at: string | null
  }[]
>([])

async function goBack() {
  await router.push('/account')
}

function toggleUser(id: string) {
  openUserId.value = openUserId.value === id ? null : id
}

async function loadUsers() {
  isLoading.value = true
  errorMsg.value = ''

  try {
    const response = await api.get('/api/admin/users')
    adminUsers.value = response.data?.data ?? []
  } catch (error: any) {
    console.error('Error loading users:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.usersError')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadUsers()
})
</script>

<template>
  <section class="account-page">
    <div class="account-wrapper">
      <div class="hero-card">
        <button class="back-button" @click="goBack">← {{ t('editorPage.back') }}</button>
        <h1>{{ t('accountPage.usersTitle') }}</h1>
        <p class="subtitle">{{ t('accountPage.usersText') }}</p>
      </div>

      <div v-if="isLoading" class="card">
        <p>{{ t('accountPage.usersLoading') }}</p>
      </div>

      <div v-else-if="errorMsg" class="card">
        <p class="error-text">{{ errorMsg }}</p>
      </div>

      <div v-else-if="!adminUsers.length" class="card">
        <p>{{ t('accountPage.usersEmpty') }}</p>
      </div>

      <div v-else class="list">
        <div v-for="user in adminUsers" :key="user.user_id" class="accordion-item">
          <button class="accordion-header" @click="toggleUser(user.user_id)">
            <div class="accordion-main">
              <span class="primary-text">{{ user.email }}</span>
              <span class="secondary-text">
                {{ user.created_at || '-' }}
              </span>
            </div>
          </button>

          <div v-if="openUserId === user.user_id" class="accordion-body">
            <p>
              <strong>{{ t('accountPage.userFirstName') }}:</strong>
              {{ user.first_name || '-' }}
            </p>
            <p>
              <strong>{{ t('accountPage.userLastName') }}:</strong>
              {{ user.last_name || '-' }}
            </p>
            <p>
              <strong>{{ t('accountPage.roleLabel') }}:</strong>
              {{ user.authorities?.join(', ') || '-' }}
            </p>
          </div>
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

.hero-card,
.card {
  background-color: #252525;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.hero-card {
  margin-bottom: 2rem;
}

.back-button {
  margin-bottom: 1rem;
  background: transparent;
  border: 1px solid #3a3a3a;
  color: #e1e1e1;
  border-radius: 10px;
  padding: 0.8rem 1.1rem;
  cursor: pointer;
}

.subtitle {
  color: #cfcfcf;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.accordion-item {
  background-color: #252525;
  border: 1px solid #333;
  border-radius: 14px;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 1.1rem 1.25rem;
  text-align: left;
}

.accordion-header:hover {
  background-color: #2b2b2b;
}

.accordion-main {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.primary-text {
  font-weight: 600;
  color: #ffffff;
  word-break: break-word;
}

.secondary-text {
  color: #bdbdbd;
  font-size: 0.95rem;
  text-align: right;
}

.accordion-body {
  border-top: 1px solid #333;
  background-color: #1f1f1f;
  padding: 1rem 1.25rem;
}

.accordion-body p {
  margin: 0.45rem 0;
  color: #e1e1e1;
  word-break: break-word;
}

.error-text {
  color: #ff7b7b;
  font-weight: 600;
}

@media (max-width: 768px) {
  .account-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .card {
    padding: 1.5rem;
  }

  .accordion-main {
    flex-direction: column;
    align-items: flex-start;
  }

  .secondary-text {
    text-align: left;
  }
}
</style>
