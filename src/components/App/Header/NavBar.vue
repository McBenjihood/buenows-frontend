<script setup lang="ts"></script>

<template>
  <ul class="navbar">
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/about">About</router-link></li>
    <li><router-link to="/contact">Contact</router-link></li>
  </ul>
</template>

<style scoped>
.navbar {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  background-color: lightgray;
  color: white;
  padding: 10px;
}
</style>
