<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const coreServices = computed(
  () => tm('servicesPage.coreServices') as Array<{ title: string; text: string }>,
)

const upcomingServices = computed(() => tm('servicesPage.upcomingServices') as string[])
const targetGroups = computed(() => tm('servicesPage.targetGroups') as string[])
</script>

<template>
  <section class="services-page">
    <div class="services-wrapper">
      <div class="hero-card">
        <span class="section-label">{{ t('servicesPage.label') }}</span>
        <h1>{{ t('servicesPage.heroTitle') }}</h1>
        <p class="hero-text">
          {{ t('servicesPage.heroText') }}
        </p>
      </div>

      <div class="section-card">
        <div class="section-heading">
          <span class="section-label">{{ t('servicesPage.coreLabel') }}</span>
          <h2>{{ t('servicesPage.coreTitle') }}</h2>
          <p>
            {{ t('servicesPage.coreText') }}
          </p>
        </div>

        <div class="services-grid">
          <div v-for="service in coreServices" :key="service.title" class="service-card">
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </div>
        </div>
      </div>

      <div class="two-column-grid">
        <div class="section-card">
          <div class="section-heading">
            <span class="section-label">{{ t('servicesPage.upcomingLabel') }}</span>
            <h2>{{ t('servicesPage.upcomingTitle') }}</h2>
            <p>
              {{ t('servicesPage.upcomingText') }}
            </p>
          </div>

          <ul class="bullet-list">
            <li v-for="service in upcomingServices" :key="service">
              {{ service }}
            </li>
          </ul>
        </div>

        <div class="section-card">
          <div class="section-heading">
            <span class="section-label">{{ t('servicesPage.targetGroupsLabel') }}</span>
            <h2>{{ t('servicesPage.targetGroupsTitle') }}</h2>
          </div>

          <ul class="bullet-list">
            <li v-for="group in targetGroups" :key="group">
              {{ group }}
            </li>
          </ul>
        </div>
      </div>

      <div class="process-card">
        <div class="section-heading center">
          <span class="section-label">{{ t('servicesPage.collaborationLabel') }}</span>
          <h2>{{ t('servicesPage.collaborationTitle') }}</h2>
        </div>

        <div class="process-grid">
          <div class="process-step">
            <h3>{{ t('servicesPage.step1Title') }}</h3>
            <p>
              {{ t('servicesPage.step1Text') }}
            </p>
          </div>

          <div class="process-step">
            <h3>{{ t('servicesPage.step2Title') }}</h3>
            <p>
              {{ t('servicesPage.step2Text') }}
            </p>
          </div>

          <div class="process-step">
            <h3>{{ t('servicesPage.step3Title') }}</h3>
            <p>
              {{ t('servicesPage.step3Text') }}
            </p>
          </div>

          <div class="process-step">
            <h3>{{ t('servicesPage.step4Title') }}</h3>
            <p>
              {{ t('servicesPage.step4Text') }}
            </p>
          </div>
        </div>
      </div>

      <div class="cta-card">
        <span class="section-label">{{ t('servicesPage.contactLabel') }}</span>
        <h2>{{ t('servicesPage.ctaTitle') }}</h2>
        <p>
          {{ t('servicesPage.ctaText') }}
        </p>

        <router-link to="/contact" class="primary-button">
          {{ t('servicesPage.ctaButton') }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
}

.services-wrapper {
  max-width: 1200px;
  margin: 0 auto;
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

.hero-card,
.section-card,
.process-card,
.cta-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-card,
.section-card,
.process-card {
  margin-bottom: 2rem;
}

.hero-card h1 {
  margin: 0 0 1rem 0;
  font-size: 2.9rem;
  line-height: 1.15;
  max-width: 950px;
}

.hero-text {
  margin: 0;
  max-width: 850px;
  color: #d2d2d2;
  line-height: 1.7;
  font-size: 1.1rem;
}

.section-heading {
  margin-bottom: 2rem;
}

.section-heading.center {
  text-align: center;
}

.section-heading h2 {
  margin: 0 0 0.8rem 0;
  font-size: 2rem;
}

.section-heading p {
  margin: 0;
  color: #d2d2d2;
  line-height: 1.7;
  max-width: 820px;
}

.section-heading.center p {
  margin-left: auto;
  margin-right: auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.service-card {
  background-color: #1f1f1f;
  border-radius: 14px;
  padding: 1.5rem;
}

.service-card h3 {
  margin-top: 0;
  margin-bottom: 0.8rem;
  color: #42b883;
}

.service-card p {
  margin: 0;
  color: #dfdfdf;
  line-height: 1.7;
}

.two-column-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.bullet-list {
  margin: 0;
  padding-left: 1.2rem;
}

.bullet-list li {
  margin-bottom: 0.9rem;
  color: #e0e0e0;
  line-height: 1.6;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.process-step {
  background-color: #1f1f1f;
  border-radius: 14px;
  padding: 1.5rem;
}

.process-step h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #42b883;
}

.process-step p {
  margin: 0;
  color: #dfdfdf;
  line-height: 1.7;
}

.cta-card {
  text-align: center;
}

.cta-card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2.2rem;
}

.cta-card p {
  max-width: 760px;
  margin: 0 auto 2rem auto;
  color: #d2d2d2;
  line-height: 1.7;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 10px;
  padding: 0.95rem 1.4rem;
  font-weight: 700;
  background-color: #42b883;
  color: white;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.primary-button:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

@media (max-width: 992px) {
  .services-grid,
  .two-column-grid,
  .process-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .services-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .section-card,
  .process-card,
  .cta-card {
    padding: 1.5rem;
  }

  .hero-card h1 {
    font-size: 2.1rem;
  }

  .section-heading h2,
  .cta-card h2 {
    font-size: 1.7rem;
  }
}
</style>
