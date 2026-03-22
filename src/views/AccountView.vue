<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { authStore } from '@/services/auth.ts'
import { useRouter } from 'vue-router'
import { getCurrentUser } from '@/services/api.ts'

const router = useRouter()

const isLoading = ref(true)
const errorMsg = ref('')

const userProfile = ref<{
  id: string
  email: string
  authorities: string[]
} | null>(null)

async function handleLogout() {
  authStore.logout()
  await router.push('/auth/login')
}

async function loadCurrentUser() {
  isLoading.value = true
  errorMsg.value = ''

  try {
    const response = await getCurrentUser()
    userProfile.value = response.data
  } catch (error: any) {
    console.error('Error loading current user:', error)
    errorMsg.value = error.response?.data?.message || 'Benutzerdaten konnten nicht geladen werden.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCurrentUser()
})
</script>

<template>
  <section class="account-page">
    <div class="account-wrapper">
      <div class="hero-card">
        <h1>Personal Area</h1>
        <p class="subtitle">Willkommen in Ihrem persönlichen Bereich bei BuenoWS.</p>
      </div>

      <div v-if="isLoading" class="card">
        <h2>Laden</h2>
        <p>Benutzerdaten werden geladen ...</p>
      </div>

      <div v-else-if="errorMsg" class="card">
        <h2>Fehler</h2>
        <p>{{ errorMsg }}</p>
      </div>

      <div v-else class="grid">
        <div class="card">
          <h2>Kontostatus</h2>
          <p v-if="authStore.isAuthenticated">Sie sind aktuell erfolgreich eingeloggt.</p>
          <p v-else>Sie sind aktuell nicht eingeloggt.</p>
        </div>

        <div class="card">
          <h2>Benutzerdaten</h2>
          <p><strong>E-Mail:</strong> {{ userProfile?.email }}</p>
          <p><strong>User ID:</strong> {{ userProfile?.id }}</p>
        </div>

        <div class="card">
          <h2>Berechtigungen</h2>
          <ul class="service-list">
            <li v-for="authority in userProfile?.authorities" :key="authority">
              {{ authority }}
            </li>
          </ul>
        </div>

        <div class="card">
          <h2>Konto-Aktionen</h2>
          <p>Hier können Sie Ihr Konto verwalten und sich sicher abmelden.</p>
          <button class="primary-button" @click="handleLogout">Logout</button>
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
  transition: opacity 0.2s ease;
}

.primary-button:hover {
  opacity: 0.9;
}

.service-list {
  padding-left: 1.2rem;
  margin: 0;
}

.service-list li {
  margin-bottom: 0.6rem;
  color: #e1e1e1;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
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
