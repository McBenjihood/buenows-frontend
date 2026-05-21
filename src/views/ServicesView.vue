<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

type WorkItem = {
  id: string
  title: string
  description: string
  url: string
  domain: string
  embedUrl: string
}

const coreServices = computed(
  () => tm('servicesPage.coreServices') as Array<{ title: string; text: string }>,
)

const upcomingServices = computed(() => tm('servicesPage.upcomingServices') as string[])
const targetGroups = computed(() => tm('servicesPage.targetGroups') as string[])
const workItems = computed(() => tm('servicesPage.workItems') as WorkItem[])
const previewWorkId = ref<string | null>(null)

function togglePreview(workId: string) {
  previewWorkId.value = previewWorkId.value === workId ? null : workId
}
</script>

<template>
  <section class="services-page">
    <div class="services-wrapper">
      <div class="hero-intro">
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

      <div class="section-card work-card">
        <div class="section-heading">
          <span class="section-label">{{ t('servicesPage.workLabel') }}</span>
          <h2>{{ t('servicesPage.workTitle') }}</h2>
          <p>
            {{ t('servicesPage.workText') }}
          </p>
        </div>

        <div class="work-grid">
          <article
            v-for="work in workItems"
            :key="work.id"
            class="project-card"
            :class="{ expanded: previewWorkId === work.id }"
          >
            <div class="project-card-summary">
              <div>
                <h3>{{ work.title }}</h3>
                <p>{{ work.description }}</p>
              </div>

              <button
                type="button"
                class="preview-button"
                :aria-expanded="previewWorkId === work.id"
                :aria-label="
                  previewWorkId === work.id
                    ? t('servicesPage.workClosePreviewButton')
                    : t('servicesPage.workPreviewButton')
                "
                @click="togglePreview(work.id)"
              >
                <span class="preview-button-label">
                  {{
                    previewWorkId === work.id
                      ? t('servicesPage.workClosePreviewButton')
                      : t('servicesPage.workPreviewButton')
                  }}
                </span>
                <span class="preview-button-icon" aria-hidden="true">×</span>
              </button>
            </div>

            <div v-if="previewWorkId === work.id" class="project-preview">
              <div class="project-preview-header">
                <div>
                  <span class="preview-eyebrow">{{ t('servicesPage.workPreviewLabel') }}</span>
                  <h4>{{ work.title }}</h4>
                </div>

                <a
                  :href="work.url"
                  class="work-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ t('servicesPage.workOpenButton') }}
                </a>
              </div>

              <div class="embed-frame">
                <iframe
                  :src="work.embedUrl"
                  :title="`${work.title} ${t('servicesPage.workPreviewTitle')}`"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </article>
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

.section-card,
.process-card,
.cta-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.section-card,
.process-card {
  margin-bottom: 2rem;
}

.hero-intro {
  margin-bottom: 2rem;
  padding: 1rem 0;
}

.hero-intro h1 {
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

.work-card {
  overflow: hidden;
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  background-color: #1f1f1f;
  border: 1px solid rgba(66, 184, 131, 0.7);
  border-radius: 14px;
  padding: 2rem;
  min-height: 260px;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.project-card.expanded {
  grid-column: 1 / -1;
}

.project-card:hover {
  transform: translateY(-2px);
  border-color: rgba(66, 184, 131, 0.7);
  background-color: #202020;
}

.project-card.expanded:hover {
  border-color: rgba(66, 184, 131, 0.7);
}

.project-card h3 {
  margin: 0 0 0.75rem;
  color: #42b883;
  font-size: 1.55rem;
  line-height: 1.25;
}

.project-card p {
  margin: 0;
  color: #dfdfdf;
  line-height: 1.7;
  max-width: 560px;
}

.project-card-summary {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  height: 100%;
}

.project-card-summary > div {
  max-width: 620px;
}

.preview-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid #42b883;
  border-radius: 10px;
  background-color: #42b883;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.95rem 1.2rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.preview-button:focus {
  outline: none;
}

.preview-button:hover,
.preview-button:focus-visible,
.project-card.expanded .preview-button {
  background-color: #36a774;
  border-color: #42b883;
  color: #ffffff;
}

.preview-button:focus-visible {
  outline: 2px solid #42b883;
  outline-offset: 2px;
}

.preview-button-icon {
  display: none;
  font-size: 1.35rem;
  line-height: 1;
}

.project-preview {
  border-top: 1px solid #333;
  padding-top: 1.5rem;
}

.project-card.expanded .project-card-summary {
  align-items: flex-start;
  flex-direction: row;
  min-height: auto;
}

.project-card.expanded .preview-button {
  max-width: 220px;
}

.project-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.preview-eyebrow {
  display: block;
  margin-bottom: 0.35rem;
  color: #42b883;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.project-preview-header h4 {
  margin: 0;
  color: #ffffff;
  font-size: 1.45rem;
}

.work-link {
  flex: 0 0 auto;
  color: #42b883;
  text-decoration: none;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  padding: 0.9rem 1rem;
  font-weight: 700;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.work-link:hover {
  background-color: #1f1f1f;
  border-color: #42b883;
}

.embed-frame {
  overflow: hidden;
  min-height: 680px;
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 14px;
}

.embed-frame iframe {
  display: block;
  width: calc(100% + 18px);
  height: 100%;
  min-height: 680px;
  border: 0;
  background-color: #ffffff;
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

  .section-card,
  .process-card,
  .cta-card {
    padding: 1.5rem;
  }

  .hero-intro h1 {
    font-size: 2.1rem;
  }

  .section-heading h2,
  .cta-card h2 {
    font-size: 1.7rem;
  }

  .project-card {
    padding: 1.25rem;
    min-height: auto;
  }

  .work-grid {
    grid-template-columns: 1fr;
  }

  .project-card-summary,
  .project-preview-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .preview-button {
    width: 100%;
  }

  .project-card.expanded .preview-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border-radius: 50%;
  }

  .project-card.expanded {
    position: relative;
  }

  .project-card.expanded .project-card-summary {
    padding-right: 3.5rem;
  }

  .project-card.expanded .preview-button-label {
    display: none;
  }

  .project-card.expanded .preview-button-icon {
    display: inline-flex;
  }

  .work-link {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }

  .embed-frame,
  .embed-frame iframe {
    min-height: 520px;
  }
}
</style>