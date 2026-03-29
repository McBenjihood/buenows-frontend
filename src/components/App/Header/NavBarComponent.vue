<script setup lang="ts">
import homeIcon from '@/assets/img/icons/navbar/home.svg'
import aboutIcon from '@/assets/img/icons/navbar/about_us.svg'
import servicesIcon from '@/assets/img/icons/navbar/about_us.svg'
import contactIcon from '@/assets/img/icons/navbar/contact.svg'
import accountIcon from '@/assets/img/icons/navbar/account_circle.svg'
import { authStore } from '@/services/auth.ts'
import { useRoute } from 'vue-router'

const route = useRoute()

function isPersonalAreaRoute() {
  return route.path.startsWith('/account')
}
</script>

<template>
  <ul class="navbar">
    <li>
      <router-link to="/">
        <img :src="homeIcon" alt="Home" class="nav-icon" />
        <span>Home</span>
      </router-link>
    </li>
    <li>
      <router-link to="/about">
        <img :src="aboutIcon" alt="About" class="nav-icon" />
        <span>About</span>
      </router-link>
    </li>
    <li>
      <router-link to="/services">
        <img :src="servicesIcon" alt="Services" class="nav-icon" />
        <span>Services</span>
      </router-link>
    </li>
    <li>
      <router-link to="/contact">
        <img :src="contactIcon" alt="Contact" class="nav-icon" />
        <span>Contact</span>
      </router-link>
    </li>

    <li v-if="!authStore.isAuthenticated">
      <router-link to="/auth/login">
        <img :src="accountIcon" alt="Account" class="nav-icon" />
        <span>Account</span>
      </router-link>
    </li>

    <template v-else>
      <li>
        <router-link to="/account" :class="{ 'active-personal-area': isPersonalAreaRoute() }">
          <img :src="accountIcon" alt="Account" class="nav-icon" />
          <span>Personal Area</span>
        </router-link>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.navbar {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.navbar li a {
  text-decoration: none;
  color: #e1e1e1;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0.75em 0.75em;
  border-radius: 0.5em;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  display: flex;
  align-items: center;
  gap: 0.5em;
}

.nav-icon {
  height: 1.2em;
  width: auto;
  display: block;
}

.navbar li a:hover {
  background-color: rgb(49, 46, 58);
  color: white;
}

.active-personal-area {
  color: #42b883 !important;
}

.router-link-active {
  color: #42b883 !important;
}
</style>