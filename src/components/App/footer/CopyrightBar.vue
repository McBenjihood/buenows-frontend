<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="copyright">
    <h4>{{ t('footer.copyright') }}</h4>
    <router-link to="/legal" class="legal-link">{{ t('footer.legal') }}</router-link>
  </div>
</template>

<style scoped>
.copyright {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.5rem;
  color: #666;
}

.copyright h4 {
  margin: 0;
}

.legal-link {
  color: #8a8a8a;
  font-size: 0.82rem;
  text-decoration: none;
}

.legal-link:hover {
  color: #42b883;
  text-decoration: underline;
}
</style>
