<script setup lang="ts">
import logo from '@/assets/img/logo/logo.png'
</script>

<template>
  <router-link to="/" class="logo-link">
    <img :src="logo" alt="Bueno Web Solutions Logo" />
  </router-link>
</template>

<style scoped>
.logo-link {
  display: flex;
  align-items: center;
}

img {
  height: 6em;
  width: auto;
}
</style>
