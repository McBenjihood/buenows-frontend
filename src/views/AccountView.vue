<script setup lang="ts">
import { authStore } from '@/services/auth.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

async function handleLogout() {
  authStore.logout()
  await router.push('/auth/login')
}
</script>

<template>
  <section class="account-page">
    <div class="account-card">
      <h1>Personal Area</h1>
      <p class="subtitle">Willkommen in Ihrem persönlichen Bereich.</p>

      <div class="status-box">
        <h2>Kontostatus</h2>
        <p v-if="authStore.isAuthenticated">Sie sind aktuell eingeloggt.</p>
        <p v-else>Sie sind nicht eingeloggt.</p>
      </div>

      <div class="actions-box">
        <h2>Aktionen</h2>
        <button class="primary-button" @click="handleLogout">Logout</button>
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.account-card {
  width: 100%;
  max-width: 800px;
  background-color: #252525;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.account-card h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #cfcfcf;
  margin-bottom: 2rem;
}

.status-box,
.actions-box {
  background-color: #1f1f1f;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.status-box h2,
.actions-box h2 {
  margin-top: 0;
  color: #42b883;
}

.primary-button {
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
</style>
