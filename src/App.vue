<script setup lang="ts">
import Header from '/src/components/App/Header/Header.vue'
</script>

<template>
  <Header />
  <router-view />
</template>

<style>
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
  margin: 0;
  font-family: 'Google Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button,
input,
textarea,
select {
  font-family: inherit;
}
</style>
