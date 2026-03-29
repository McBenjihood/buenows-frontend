<script setup lang="ts">
import { ref } from 'vue'
import api from '@/services/api.ts'

const email = ref('')
const title = ref('')
const message = ref('')

const isLoading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

async function submitForm() {
  isLoading.value = true
  successMsg.value = ''
  errorMsg.value = ''

  try {
    const response = await api.post('/api/inquiry/contact-submissions', {
      email: email.value,
      title: title.value,
      message: message.value,
    })

    successMsg.value = response.data?.message || 'Nachricht erfolgreich gesendet.'

    email.value = ''
    title.value = ''
    message.value = ''
  } catch (error: any) {
    console.error('Error sending contact form:', error)
    errorMsg.value =
      error.response?.data?.message || 'Beim Senden der Nachricht ist ein Fehler aufgetreten.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="contact-page">
    <div class="contact-wrapper">
      <div class="hero-card">
        <span class="section-label">Kontakt</span>
        <h1>Lassen Sie uns über Ihr Projekt sprechen.</h1>
        <p class="hero-text">
          Ob neue Website, Modernisierung, Backend-Lösung oder digitale Automatisierung – schreiben
          Sie uns kurz, worum es geht, und wir melden uns bei Ihnen.
        </p>
      </div>

      <div class="contact-grid">
        <div class="info-card">
          <h2>Direkter Kontakt</h2>

          <div class="contact-item">
            <h3>Telefon</h3>
            <a href="tel:+410775238836" class="contact-link">+41 077 523 88 36</a>
            <p>Mo – Fr, 09:00 bis 18:00 Uhr</p>
          </div>

          <div class="contact-item">
            <h3>E-Mail</h3>
            <a href="mailto:info.buenows@gmail.com" class="contact-link">info.buenows@gmail.com</a>
            <p>Wir antworten so schnell wie möglich.</p>
          </div>

          <div class="contact-item">
            <h3>Was Sie uns schreiben können</h3>
            <p>
              Beschreiben Sie kurz Ihr Vorhaben, Ihre aktuelle Situation oder Ihr Ziel. Je klarer
              Ihre Anfrage ist, desto besser können wir Sie unterstützen.
            </p>
          </div>
        </div>

        <div class="form-card">
          <h2>Nachricht senden</h2>

          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input v-model="email" type="email" id="email" placeholder="ihre@mail.de" required />
            </div>

            <div class="form-group">
              <label for="title">Anliegen</label>
              <input
                v-model="title"
                type="text"
                id="title"
                placeholder="Neue Website, Support, Automatisierung ..."
                required
              />
            </div>

            <div class="form-group">
              <label for="message">Beschreibung</label>
              <textarea
                id="message"
                rows="6"
                placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Anfrage ..."
                v-model="message"
                required
              ></textarea>
            </div>

            <button class="submit-btn" type="submit" :disabled="isLoading">
              {{ isLoading ? 'Wird gesendet ...' : 'Nachricht senden' }}
            </button>
            <p v-if="successMsg" class="success-message">{{ successMsg }}</p>
            <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
}

.contact-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.section-label {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #42b883;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-card h1 {
  margin: 0 0 1rem 0;
  font-size: 2.6rem;
  line-height: 1.2;
}

.hero-text {
  margin: 0;
  max-width: 820px;
  color: #d2d2d2;
  line-height: 1.7;
  font-size: 1.1rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 2rem;
}

.info-card,
.form-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.info-card h2,
.form-card h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #42b883;
}

.contact-item + .contact-item {
  margin-top: 2rem;
}

.contact-item h3 {
  margin-bottom: 0.6rem;
  color: #ffffff;
}

.contact-item p {
  color: #d1d1d1;
  line-height: 1.7;
}

.contact-link {
  display: inline-block;
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.contact-link:hover {
  text-decoration: underline;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #42b883;
  font-size: 0.95rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 0.95rem 1rem;
  color: white;
  font-family: inherit;
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b883;
}

.submit-btn {
  background-color: #42b883;
  color: #ffffff;
  border: none;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .info-card,
  .form-card {
    padding: 1.5rem;
  }

  .hero-card h1 {
    font-size: 2rem;
  }
}

.form-group input,
.form-group textarea {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 0.95rem 1rem;
  color: white;
  font-family: inherit;
  transition: border-color 0.2s ease;
}

.form-group textarea {
  resize: vertical;
}

.form-group textarea {
  resize: vertical;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  margin: 0;
  color: #42b883;
  font-weight: 600;
  line-height: 1.5;
}

.error-message {
  margin: 0;
  color: #ff7b7b;
  font-weight: 600;
  line-height: 1.5;
}
</style>
