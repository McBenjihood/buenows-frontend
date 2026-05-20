<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const content = computed(() => {
  if (locale.value === 'de') {
    return {
      label: '404',
      title: 'Seite nicht gefunden',
      text: 'Die angeforderte Seite existiert nicht oder wurde verschoben.',
      home: 'Zur Startseite',
      contact: 'Kontakt',
    }
  }

  return {
    label: '404',
    title: 'Page not found',
    text: 'The requested page does not exist or has moved.',
    home: 'Go home',
    contact: 'Contact',
  }
})
</script>

<template>
  <section class="not-found-page">
    <div class="not-found-card">
      <span class="section-label">{{ content.label }}</span>
      <h1>{{ content.title }}</h1>
      <p>{{ content.text }}</p>

      <div class="actions">
        <router-link to="/" class="primary-button">{{ content.home }}</router-link>
        <router-link to="/contact" class="secondary-button">{{ content.contact }}</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found-page {
  min-height: 70vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
}

.not-found-card {
  max-width: 760px;
  margin: 0 auto;
  background-color: #252525;
  border-radius: 18px;
  padding: 3rem;
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

h1 {
  margin: 0 0 1rem;
  font-size: 2.4rem;
  line-height: 1.2;
}

p {
  margin: 0;
  color: #d2d2d2;
  line-height: 1.7;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 10px;
  padding: 0.95rem 1.4rem;
  font-weight: 700;
}

.primary-button {
  background-color: #42b883;
  color: #ffffff;
}

.secondary-button {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #3a3a3a;
}

@media (max-width: 768px) {
  .not-found-page {
    padding: 2rem 1rem;
  }

  .not-found-card {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
