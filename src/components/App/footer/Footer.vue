<script setup lang="ts">
import Logo from '@/components/App/header/Logo.vue'
import FooterNavigation from '@/components/App/footer/FooterNavigation.vue'
import CopyrightBar from '@/components/App/footer/CopyrightBar.vue'
</script>

<template>
  <footer class="footer">
    <Logo class="footer-logo" />
    <CopyrightBar />
    <FooterNavigation />
  </footer>
</template>

<style scoped>
.footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 2rem;

  min-height: 8em;
  padding: 1.25rem 3rem;

  background-color: rgb(23, 23, 23);
  border-top: 0.0625em solid rgb(49, 46, 58);
}

.footer-logo {
  justify-self: start;
}

.footer-logo :deep(img) {
  height: 5.75rem;
}

@media (max-width: 768px) {
  .footer {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 1.25rem;
    padding: 2rem 1rem;
    text-align: center;
  }

  .footer-logo {
    justify-self: center;
  }
}
</style>
