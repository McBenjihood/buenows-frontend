<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="copyright">
    <p class="copyright-text">{{ t('footer.copyright') }}</p>
    <router-link to="/legal" class="legal-link">{{ t('footer.legal') }}</router-link>
  </div>
</template>

<style scoped>
.copyright {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  max-width: 100%;
  color: #777;
  text-align: center;
}

.copyright-text {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
}

.legal-link {
  color: #a6a6a6;
  font-size: 0.9rem;
  line-height: 1.4;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.legal-link:hover {
  color: #42b883;
}

@media (max-width: 640px) {
  .copyright {
    gap: 0.3rem;
  }

  .copyright-text {
    max-width: 22rem;
    color: #898989;
    font-size: 0.82rem;
    font-weight: 600;
    line-height: 1.4;
  }

  .legal-link {
    font-size: 0.78rem;
  }
}
</style>
