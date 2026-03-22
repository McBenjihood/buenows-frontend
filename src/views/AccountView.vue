<script setup lang="ts">
import { authStore } from '@/services/auth.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

async function handleLogout() {
  authStore.logout()
  await router.push('/auth/login')
}

const services = [
  'Webseiten erstellen',
  'Webseiten erneuern',
  'Backend Entwicklung',
  'Automatische E-Mail Antworten',
  'AI Telefon Assistent',
]
</script>

<template>
  <section class="account-page">
    <div class="account-wrapper">
      <div class="hero-card">
        <h1>Personal Area</h1>
        <p class="subtitle">Willkommen in Ihrem persönlichen Bereich bei BuenoWS.</p>
      </div>

      <div class="grid">
        <div class="card">
          <h2>Kontostatus</h2>
          <p v-if="authStore.isAuthenticated">Sie sind aktuell erfolgreich eingeloggt.</p>
          <p v-else>Sie sind aktuell nicht eingeloggt.</p>
        </div>

        <div class="card">
          <h2>Konto-Aktionen</h2>
          <p>Hier können Sie Ihr Konto verwalten und sich sicher abmelden.</p>
          <button class="primary-button" @click="handleLogout">Logout</button>
        </div>

        <div class="card">
          <h2>Ihre Interessen</h2>
          <ul class="service-list">
            <li v-for="service in services" :key="service">
              {{ service }}
            </li>
          </ul>
        </div>

        <div class="card">
          <h2>Profilbereich</h2>
          <p>
            Später können hier persönliche Daten wie Name, E-Mail oder Firmendaten angezeigt und
            bearbeitet werden.
          </p>
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
