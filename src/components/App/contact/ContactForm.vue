<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import api from '@/services/api.ts'

const { t } = useI18n()

const email = ref('')
const title = ref('')
const message = ref('')

// Honeypot-Feld gegen einfache Bots.
// Normale Nutzer sehen dieses Feld nicht.
// Wenn es ausgefüllt ist, brechen wir den Submit ab.
const website = ref('')

const isLoading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

async function submitForm() {
  successMsg.value = ''
  errorMsg.value = ''

  if (website.value.trim()) {
    return
  }

  if (isLoading.value) {
    return
  }

  const trimmedEmail = email.value.trim()
  const trimmedTitle = title.value.trim()
  const trimmedMessage = message.value.trim()

  if (!trimmedEmail || !trimmedTitle || !trimmedMessage) {
    errorMsg.value = t('contactPage.fillAllFields')
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(trimmedEmail)) {
    errorMsg.value = 'Bitte gib eine gültige E-Mail-Adresse ein.'
    return
  }

  if (trimmedEmail.length > 254) {
    errorMsg.value = 'Die E-Mail-Adresse ist zu lang.'
    return
  }

  if (trimmedTitle.length > 120) {
    errorMsg.value = 'Der Betreff ist zu lang.'
    return
  }

  if (trimmedMessage.length > 2000) {
    errorMsg.value = 'Die Nachricht ist zu lang.'
    return
  }

  isLoading.value = true

  try {
    const response = await api.post('/api/inquiry/contact-submissions', {
      email: trimmedEmail,
      title: trimmedTitle,
      message: trimmedMessage,
    })

    successMsg.value = response.data?.message || t('contactPage.successDefault')

    email.value = ''
    title.value = ''
    message.value = ''
    website.value = ''
  } catch (error: any) {
    console.error('Error sending contact form:', error)
    errorMsg.value = error.response?.data?.message || t('contactPage.errorDefault')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="contact-page">
    <div class="contact-wrapper">
      <div class="hero-card">
        <span class="section-label">{{ t('contactPage.label') }}</span>
        <h1>{{ t('contactPage.heroTitle') }}</h1>
        <p class="hero-text">
          {{ t('contactPage.heroText') }}
        </p>
      </div>

      <div class="contact-grid">
        <div class="info-card">
          <h2>{{ t('contactPage.directContactTitle') }}</h2>

          <div class="contact-item">
            <h3>{{ t('contactPage.phoneTitle') }}</h3>
            <a href="tel:+410775238836" class="contact-link">+41 077 523 88 36</a>
            <p>{{ t('contactPage.phoneTime') }}</p>
          </div>

          <div class="contact-item">
            <h3>{{ t('contactPage.emailTitle') }}</h3>
            <a href="mailto:info.buenows@gmail.com" class="contact-link">info.buenows@gmail.com</a>
            <p>{{ t('contactPage.emailText') }}</p>
          </div>

          <div class="contact-item">
            <h3>{{ t('contactPage.writeUsTitle') }}</h3>
            <p>
              {{ t('contactPage.writeUsText') }}
            </p>
          </div>
        </div>

        <div class="form-card">
          <h2>{{ t('contactPage.formTitle') }}</h2>

          <form class="contact-form" @submit.prevent="submitForm">
            <input
              v-model="website"
              type="text"
              name="website"
              autocomplete="off"
              tabindex="-1"
              class="honeypot"
            />
            <div class="form-group">
              <label for="email">{{ t('contactPage.emailLabel') }}</label>
              <input
                v-model.trim="email"
                type="email"
                id="email"
                :placeholder="t('contactPage.emailPlaceholder')"
                maxlength="254"
                autocomplete="email"
                required
              />
            </div>

            <div class="form-group">
              <label for="title">{{ t('contactPage.subjectLabel') }}</label>
              <input
                v-model.trim="title"
                type="text"
                id="title"
                :placeholder="t('contactPage.subjectPlaceholder')"
                maxlength="120"
                required
              />
            </div>

            <div class="form-group">
              <label for="message">{{ t('contactPage.messageLabel') }}</label>
              <textarea
                id="message"
                rows="6"
                :placeholder="t('contactPage.messagePlaceholder')"
                v-model.trim="message"
                maxlength="2000"
                required
              ></textarea>
            </div>

            <button class="submit-btn" type="submit" :disabled="isLoading">
              {{ isLoading ? t('contactPage.sending') : t('contactPage.sendButton') }}
            </button>

            <p class="privacy-note">
              {{ t('contactPage.privacyNotice') }}
              <router-link to="/legal">{{ t('footer.legal') }}</router-link>
            </p>

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

.form-group textarea {
  resize: vertical;
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

.privacy-note {
  margin: 0;
  color: #a7a7a7;
  font-size: 0.85rem;
  line-height: 1.5;
}

.privacy-note a {
  color: #42b883;
  text-decoration: none;
}

.privacy-note a:hover {
  text-decoration: underline;
}

.honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
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
</style>
