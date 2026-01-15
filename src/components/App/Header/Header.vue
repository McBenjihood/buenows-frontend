<script setup lang="ts">
import NavBar from '@/components/App/Header/NavBar.vue'
import Logo from '@/components/App/Header/Logo.vue'
</script>

<template>
  <header class="header">
    <Logo />
    <nav-bar />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 8em;
  padding: 0 3em;

  background-color: rgb(23, 23, 23);
  border-bottom: 0.0625em solid rgb(49, 46, 58);
}
</style>
