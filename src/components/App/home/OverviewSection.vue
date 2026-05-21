<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import vueIcon from '@/assets/img/icons/technologies/vuejs_logo.svg'
import springIcon from '@/assets/img/icons/technologies/spring_logo.svg'
import postgresIcon from '@/assets/img/icons/technologies/postgres_logo.svg'
import awsIcon from '@/assets/img/icons/technologies/aws_logo.svg'

const { t, tm } = useI18n()

const technologies = [
  { name: 'Vue.js', icon: vueIcon },
  { name: 'Spring Boot', icon: springIcon },
  { name: 'PostgreSQL', icon: postgresIcon },
  { name: 'AWS Cloud', icon: awsIcon },
]

const services = computed(() => [
  {
    title: t('home.services.createWebsites.title'),
    text: t('home.services.createWebsites.text'),
  },
  {
    title: t('home.services.renewWebsites.title'),
    text: t('home.services.renewWebsites.text'),
  },
  {
    title: t('home.services.backend.title'),
    text: t('home.services.backend.text'),
  },
  {
    title: t('home.services.automations.title'),
    text: t('home.services.automations.text'),
  },
  {
    title: t('home.services.aiSolutions.title'),
    text: t('home.services.aiSolutions.text'),
  },
  {
    title: t('home.services.hosting.title'),
    text: t('home.services.hosting.text'),
  },
])

const benefits = computed(() => tm('home.benefits') as string[])
const targetGroups = computed(() => tm('home.targetGroups') as string[])
</script>

<template>
  <section class="home-page">
    <div class="page-wrapper">
      <div class="hero-card">
        <span class="section-label">{{ t('home.brand') }}</span>
        <h1>{{ t('home.heroTitle') }}</h1>
        <p class="hero-text">
          {{ t('home.heroText') }}
        </p>

        <div class="hero-actions">
          <router-link to="/contact" class="primary-button">
            {{ t('home.requestProject') }}
          </router-link>
          <router-link to="/about" class="secondary-button">
            {{ t('home.moreAboutUs') }}
          </router-link>
        </div>
      </div>

      <div class="highlights-grid">
        <div class="highlight-card">
          <h2>{{ t('home.modernTitle') }}</h2>
          <p>
            {{ t('home.modernText') }}
          </p>
        </div>

        <div class="highlight-card">
          <h2>{{ t('home.customTitle') }}</h2>
          <p>
            {{ t('home.customText') }}
          </p>
        </div>

        <div class="highlight-card">
          <h2>{{ t('home.reliableTitle') }}</h2>
          <p>
            {{ t('home.reliableText') }}
          </p>
        </div>
      </div>

      <div class="reference-row">
        <div>
          <span class="reference-label">{{ t('home.referenceLabel') }}</span>
          <h2>{{ t('home.referenceTitle') }}</h2>
          <p>{{ t('home.referenceText') }}</p>
        </div>

        <a
          href="https://coiffeur-ek-exklusiv.ch/"
          class="reference-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{{ t('home.referenceDomain') }}</span>
          <strong>{{ t('home.referenceButton') }}</strong>
        </a>
      </div>

      <div class="section-card">
        <div class="section-heading">
          <span class="section-label">{{ t('home.servicesLabel') }}</span>
          <h2>{{ t('home.servicesTitle') }}</h2>
          <p>
            {{ t('home.servicesText') }}
          </p>
        </div>

        <div class="services-grid">
          <div v-for="service in services" :key="service.title" class="service-card">
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </div>
        </div>
      </div>

      <div class="two-column-grid">
        <div class="section-card">
          <div class="section-heading">
            <span class="section-label">{{ t('home.benefitsLabel') }}</span>
            <h2>{{ t('home.benefitsTitle') }}</h2>
          </div>

          <ul class="bullet-list">
            <li v-for="benefit in benefits" :key="benefit">
              {{ benefit }}
            </li>
          </ul>
        </div>

        <div class="section-card">
          <div class="section-heading">
            <span class="section-label">{{ t('home.targetGroupsLabel') }}</span>
            <h2>{{ t('home.targetGroupsTitle') }}</h2>
          </div>

          <ul class="bullet-list">
            <li v-for="group in targetGroups" :key="group">
              {{ group }}
            </li>
          </ul>
        </div>
      </div>

      <div class="section-card">
        <div class="section-heading center">
          <span class="section-label">{{ t('home.technologiesLabel') }}</span>
          <h2>{{ t('home.technologiesTitle') }}</h2>
          <p>
            {{ t('home.technologiesText') }}
          </p>
        </div>

        <div class="tech-grid">
          <div v-for="tech in technologies" :key="tech.name" class="tech-card">
            <img :src="tech.icon" :alt="tech.name" loading="lazy" decoding="async" />
            <span>{{ tech.name }}</span>
          </div>
        </div>
      </div>

      <div class="cta-card">
        <span class="section-label">{{ t('home.contactLabel') }}</span>
        <h2>{{ t('home.ctaTitle') }}</h2>
        <p>
          {{ t('home.ctaText') }}
        </p>

        <router-link to="/contact" class="primary-button">
          {{ t('home.contactNow') }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
}

.page-wrapper {
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
.cta-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-card {
  margin-bottom: 2rem;
}

.hero-card h1 {
  margin: 0 0 1rem 0;
  font-size: 3rem;
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

.hero-actions {
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
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    background-color 0.2s ease;
}

.primary-button {
  background-color: #42b883;
  color: white;
}

.primary-button:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

.secondary-button {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #3a3a3a;
}

.secondary-button:hover {
  background-color: #2e2e2e;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.highlight-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
}

.highlight-card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #42b883;
}

.highlight-card p {
  color: #e0e0e0;
  line-height: 1.7;
  margin: 0;
}

.reference-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem 0;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
}

.reference-label {
  display: block;
  margin-bottom: 0.6rem;
  color: #42b883;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.reference-row h2 {
  margin: 0 0 0.55rem 0;
  color: #ffffff;
  font-size: 1.45rem;
  line-height: 1.25;
}

.reference-row p {
  margin: 0;
  color: #d2d2d2;
  line-height: 1.6;
  max-width: 620px;
}

.reference-link {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  color: #ffffff;
  text-decoration: none;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  padding: 0.9rem 1rem;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.reference-link span {
  color: #bdbdbd;
  font-size: 0.95rem;
}

.reference-link strong {
  color: #42b883;
  font-size: 0.95rem;
}

.reference-link:hover {
  background-color: #202020;
  border-color: #42b883;
}

.section-card {
  margin-bottom: 2rem;
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
  max-width: 800px;
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

.tech-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.tech-card {
  background-color: #1f1f1f;
  border-radius: 16px;
  padding: 2rem;
  width: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.08);
}

.tech-card img {
  height: 72px;
  width: auto;
  margin-bottom: 1.2rem;
  display: block;
}

.tech-card span {
  color: #42b883;
  font-weight: 600;
  font-size: 1.1rem;
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

@media (max-width: 992px) {
  .highlights-grid,
  .services-grid,
  .two-column-grid {
    grid-template-columns: 1fr;
  }

  .reference-row {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .section-card,
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

  .reference-row {
    padding: 1.5rem 0;
  }

  .reference-link {
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
  }

  .tech-card {
    width: 42%;
    min-width: 140px;
  }
}
</style>
