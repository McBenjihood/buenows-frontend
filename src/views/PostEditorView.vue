<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

async function goBack() {
  await router.push('/account')
}
</script>

<template>
  <section class="editor-page">
    <div class="editor-wrapper">
      <div class="editor-header">
        <button class="back-button" @click="goBack">← {{ t('editorPage.back') }}</button>

        <div>
          <h1>{{ t('editorPage.title') }}</h1>
          <p class="subtitle">{{ t('editorPage.subtitle') }}</p>
        </div>
      </div>

      <div class="editor-shell">
        <div class="editor-topbar">
          <h2>{{ t('editorPage.areaTitle') }}</h2>
        </div>

        <div class="editor-placeholder"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editor-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
  padding: 3rem 2rem 4rem;
}

.editor-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.editor-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.back-button {
  background: transparent;
  border: 1px solid #3a3a3a;
  color: #e1e1e1;
  border-radius: 10px;
  padding: 0.8rem 1.1rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.back-button:hover {
  background-color: #252525;
  transform: translateY(-1px);
}

.editor-header h1 {
  margin: 0;
}

.subtitle {
  margin: 0.35rem 0 0;
  color: #bdbdbd;
}

.editor-shell {
  background-color: #252525;
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.editor-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.editor-topbar h2 {
  margin: 0;
  color: #42b883;
}

.editor-placeholder {
  min-height: 520px;
  border: 1px dashed #3a3a3a;
  border-radius: 14px;
  background-color: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.editor-placeholder p {
  margin: 0;
  color: #bdbdbd;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .editor-page {
    padding: 2rem 1rem 3rem;
  }

  .editor-shell {
    padding: 1rem;
  }

  .editor-topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .editor-placeholder {
    min-height: 420px;
  }
}
</style>
