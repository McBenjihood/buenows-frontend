<script setup lang="ts">
import Navbar from '@/components/App/header/Navbar.vue'
import Logo from '@/components/App/header/Logo.vue'
import FooterNavigation from '@/components/App/footer/FooterNavigation.vue'
import CopyrightBar from '@/components/App/footer/CopyrightBar.vue'
</script>

<template>
  <footer class="footer">
    <Logo />
    <CopyrightBar/>
    <FooterNavigation />
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 8em;
  padding: 0 3em;

  background-color: rgb(23, 23, 23);
  border-top: 0.0625em solid rgb(49, 46, 58);
}
</style>
