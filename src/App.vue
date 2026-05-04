<script setup lang="ts">
import Header from '@/components/App/header/Header.vue'
import Footer from '@/components/App/footer/Footer.vue'
</script>

<template>
  <div class="app-wrapper">
    <Header />

    <main class="content">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style>

html,
body {
  height: 100%;
  margin: 0;
}

html {
  background-color: rgb(23, 23, 23);
}

:root {
  font-family: 'Google Sans', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'GRAD' 0;
}

body {
  font-family: 'Google Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

button,
input,
textarea,
select {
  font-family: inherit;
}
</style>
