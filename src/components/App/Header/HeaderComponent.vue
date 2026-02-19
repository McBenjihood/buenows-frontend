<script setup lang="ts">
import NavBarComponent from '@/components/App/Header/NavBarComponent.vue'
import LogoComponent from '@/components/App/Header/LogoComponent.vue'
</script>

<template>
  <header class="header">
    <LogoComponent />
    <nav-bar-component />
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
