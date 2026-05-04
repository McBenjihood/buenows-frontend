<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import githubIcon from '@/assets/img/icons/socials/github_icon.svg'
import linkedinLogo from '@/assets/img/icons/socials/linkedin_logo.svg'

const { t } = useI18n()
</script>

<template>
  <div class="Navigation">
    <div class="socials">
      <span class="socials-label">{{ t('footer.socials') }}</span>

      <div class="socials-links">
        <a
          href="https://github.com/McBenjihood"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <img :src="githubIcon" alt="GitHub" />
        </a>

        <a
          href="https://www.linkedin.com/in/benjamin-gerresheim-9b4b68225/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <img :src="linkedinLogo" alt="LinkedIn" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  color: #666;
}

.socials {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.socials-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 0.25em solid rgb(49, 46, 58);
}

.socials-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.socials-links img {
  height: 1.5rem;
  width: auto;
  display: block;
}

.socials-links a {
  display: flex;
  text-decoration: none;
}
</style>
