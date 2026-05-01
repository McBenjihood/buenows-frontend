<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="about-page">
    <div class="about-wrapper">
      <div class="hero-card">
        <span class="section-label">{{ t('about.label') }}</span>
        <h1>{{ t('about.heroTitle') }}</h1>
        <p class="hero-text">
          {{ t('about.heroText') }}
        </p>
      </div>

      <div class="image-wrapper">
        <img src="/src/assets/img/team/img.png" alt="Bueno Web Solutions Team" class="team-image" />
      </div>

      <div class="content-grid">
        <div class="info-card">
          <h2>{{ t('about.whoWeAreTitle') }}</h2>
          <p>
            {{ t('about.whoWeAreText1') }}
          </p>
          <p>
            {{ t('about.whoWeAreText2') }}
          </p>
        </div>

        <div class="info-card">
          <h2>{{ t('about.howWeWorkTitle') }}</h2>
          <p>
            {{ t('about.howWeWorkText1') }}
          </p>
          <p>
            {{ t('about.howWeWorkText2') }}
          </p>
        </div>
      </div>



      <div class="content-grid">
        <div class="info-card">
          <h2>{{ t('about.whyTitle') }}</h2>
          <p>{{ t('about.whyText1') }}</p>
          <p>{{ t('about.whyText2') }}</p>
        </div>

        <div class="info-card">
          <h2>{{ t('about.targetTitle') }}</h2>
          <p>{{ t('about.targetText') }}</p>
        </div>
      </div>

      <div class="content-grid">
        <div class="info-card">
          <h2>{{ t('about.differenceTitle') }}</h2>
          <p>{{ t('about.differenceText1') }}</p>
          <p>{{ t('about.differenceText2') }}</p>
        </div>

        <div class="info-card">
          <h2>{{ t('about.futureTitle') }}</h2>
          <p>{{ t('about.futureText1') }}</p>
          <p>{{ t('about.futureText2') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
}

.about-wrapper {
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
  max-width: 850px;
  color: #d2d2d2;
  line-height: 1.7;
  font-size: 1.1rem;
}

.image-wrapper {
  margin-bottom: 3rem;
}

.team-image {
  width: 100%;
  max-width: 1200px;
  height: auto;
  border-radius: 18px;
  display: block;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-card,
.values-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.info-card h2,
.values-card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #42b883;
}

.info-card p,
.values-card p {
  color: #e0e0e0;
  line-height: 1.7;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.value-box {
  background-color: #1f1f1f;
  border-radius: 14px;
  padding: 1.5rem;
}

.value-box h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #42b883;
}

@media (max-width: 768px) {
  .about-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .info-card,
  .values-card {
    padding: 1.5rem;
  }

  .hero-card h1 {
    font-size: 2rem;
  }

  .content-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
