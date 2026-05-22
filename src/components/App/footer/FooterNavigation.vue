<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import githubIcon from '@/assets/img/icons/socials/github_icon.svg'
import linkedinLogo from '@/assets/img/icons/socials/linkedin_logo.svg'

const { t } = useI18n()
</script>

<template>
  <nav class="footer-navigation" :aria-label="t('footer.socials')">
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
  </nav>
</template>

<style scoped>
.footer-navigation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-self: end;
  color: #666;
}

.socials {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;
}

.socials-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 0.25rem;
  border-bottom: 0.2rem solid rgb(49, 46, 58);
}

.socials-links {
  display: flex;
  gap: 0.85rem;
  align-items: center;
}

.socials-links img {
  height: 1.5rem;
  width: auto;
  display: block;
}

.socials-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.socials-links a:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .footer-navigation {
    justify-self: center;
  }

  .socials {
    align-items: center;
    gap: 0.45rem;
  }

  .socials-label {
    display: none;
  }

  .socials-links img {
    height: 1.35rem;
  }
}
</style>
