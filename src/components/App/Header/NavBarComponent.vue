<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import homeIcon from '@/assets/img/icons/navbar/home.svg'
import aboutIcon from '@/assets/img/icons/navbar/about_us.svg'
import servicesIcon from '@/assets/img/icons/navbar/about_us.svg'
import contactIcon from '@/assets/img/icons/navbar/contact.svg'
import accountIcon from '@/assets/img/icons/navbar/account_circle.svg'
import { authStore } from '@/services/auth.ts'

const route = useRoute()
const { t, locale } = useI18n()

function isPersonalAreaRoute() {
  return route.path.startsWith('/account')
}

const currentLocale = computed(() => locale.value)

function switchLanguage(lang: 'en' | 'de') {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <ul class="navbar">
    <li>
      <router-link to="/">
        <img :src="homeIcon" :alt="t('nav.home')" class="nav-icon" />
        <span>{{ t('nav.home') }}</span>
      </router-link>
    </li>

    <li>
      <router-link to="/about">
        <img :src="aboutIcon" :alt="t('nav.about')" class="nav-icon" />
        <span>{{ t('nav.about') }}</span>
      </router-link>
    </li>

    <li>
      <router-link to="/services">
        <img :src="servicesIcon" :alt="t('nav.services')" class="nav-icon" />
        <span>{{ t('nav.services') }}</span>
      </router-link>
    </li>

    <li>
      <router-link to="/contact">
        <img :src="contactIcon" :alt="t('nav.contact')" class="nav-icon" />
        <span>{{ t('nav.contact') }}</span>
      </router-link>
    </li>

    <li v-if="!authStore.isAuthenticated">
      <router-link to="/auth/login">
        <img :src="accountIcon" :alt="t('nav.login')" class="nav-icon" />
        <span>{{ t('nav.login') }}</span>
      </router-link>
    </li>

    <li v-else>
      <router-link to="/account" :class="{ 'active-personal-area': isPersonalAreaRoute() }">
        <img :src="accountIcon" :alt="t('nav.personalArea')" class="nav-icon" />
        <span>{{ t('nav.personalArea') }}</span>
      </router-link>
    </li>

    <li class="language-switch-item">
      <div class="language-switch">
        <button
          type="button"
          class="lang-btn"
          :class="{ active: currentLocale === 'en' }"
          @click="switchLanguage('en')"
        >
          EN
        </button>

        <button
          type="button"
          class="lang-btn"
          :class="{ active: currentLocale === 'de' }"
          @click="switchLanguage('de')"
        >
          DE
        </button>
      </div>
    </li>
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

.language-switch-item {
  margin-left: 0.75em;
}

.language-switch {
  display: flex;
  align-items: center;
  gap: 0.35em;
  background-color: rgb(32, 32, 32);
  border: 1px solid rgb(49, 46, 58);
  border-radius: 999px;
  padding: 0.25em;
}

.lang-btn {
  border: none;
  background: transparent;
  color: #d1d1d1;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.45em 0.8em;
  border-radius: 999px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.lang-btn:hover {
  background-color: rgb(49, 46, 58);
  color: white;
}

.lang-btn.active {
  background-color: #42b883;
  color: white;
}
</style>
