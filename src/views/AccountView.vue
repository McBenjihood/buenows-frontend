<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { authStore } from '@/services/auth.ts'
import { useRouter } from 'vue-router'
import api, { getCurrentUserFromToken } from '@/services/api.ts'

const router = useRouter()

const isLoading = ref(true)
const errorMsg = ref('')

const userProfile = ref<{
  email: string
  authorities: string[]
  issuedAt: number | null
  expiresAt: number | null
  issuer: string
} | null>(null)

const openEditor = async () => {
  await router.push('/account/editor')
}

async function handleLogout() {
  authStore.logout()
  await router.push('/auth/login')
}

async function checkBackendAuth() {
  try {
    await api.get('/api/user/auth')
  } catch (error) {
    console.error('Backend auth check failed:', error)
    errorMsg.value = 'Sitzung konnte nicht bestätigt werden.'
  }
}

async function loadCurrentUserFromToken() {
  isLoading.value = true
  errorMsg.value = ''

  try {
    const profile = getCurrentUserFromToken()

    if (!profile) {
      errorMsg.value = 'Kein JWT gefunden.'
      return
    }

    userProfile.value = profile
    await checkBackendAuth()
  } catch (error) {
    console.error('Error parsing token:', error)
    errorMsg.value = 'Token konnte nicht gelesen werden.'
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
        <h1>Personal Area</h1>
        <p class="subtitle">
          Verwalten Sie hier Inhalte, Beiträge und Einstellungen Ihrer Website.
        </p>
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
          <h2>Website bearbeiten</h2>
          <p>
            Bearbeiten Sie später Texte, Abschnitte, Dienstleistungen und Inhalte Ihrer Website
            direkt in diesem Bereich.
          </p>
          <button class="primary-button" @click="openEditor">Editor öffnen</button>
        </div>

        <div class="card">
          <h2>Beiträge verwalten</h2>
          <p>
            Erstellen, speichern und veröffentlichen Sie hier künftig eigene Posts und Inhalte für
            Ihre Website.
          </p>
          <button class="secondary-button" disabled>Bald verfügbar</button>
        </div>

        <div class="card">
          <h2>Design anpassen</h2>
          <p>
            Farben, Bilder, Layouts und einzelne Bereiche Ihrer Website können hier später
            individuell angepasst werden.
          </p>
          <button class="secondary-button" disabled>Bald verfügbar</button>
        </div>

        <div class="card">
          <h2>Konto</h2>
          <p><strong>E-Mail:</strong> {{ userProfile?.email }}</p>
          <p><strong>Status:</strong> Aktiv eingeloggt</p>
          <p v-if="userProfile?.authorities?.length">
            <strong>Rolle:</strong> {{ userProfile.authorities.join(', ') }}
          </p>
        </div>

        <div class="card card-wide">
          <h2>Konto-Aktionen</h2>
          <p>
            Hier können Sie sich sicher abmelden. Weitere Einstellungen für Ihr Konto können später
            an dieser Stelle ergänzt werden.
          </p>
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
