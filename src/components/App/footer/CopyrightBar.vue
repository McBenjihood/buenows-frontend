<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="copyright">
    <h4>{{ t('footer.copyright') }}</h4>
  </div>
</template>

<style scoped>
.copyright {
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  color: #666;
}
</style>
