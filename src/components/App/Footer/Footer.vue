<script setup lang="ts">
import NavBar from '@/components/App/Header/NavBar.vue'
import Logo from '@/components/App/Header/Logo.vue'
import Navigation from '@/components/App/Footer/Navigation.vue'
import Copyright from '@/components/App/Footer/Copyright.vue'
</script>

<template>
  <footer class="footer">
    <Logo />
    <Copyright/>
    <Navigation />
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
