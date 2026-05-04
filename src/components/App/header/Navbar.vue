<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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

const isMenuOpen = ref(false)

const currentLocale = computed(() => locale.value)

function isPersonalAreaRoute() {
  return route.path.startsWith('/account')
}

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function switchLanguage(lang: 'en' | 'de') {
  if (lang !== 'en' && lang !== 'de') {
    return
  }

  locale.value = lang

  try {
    localStorage.setItem('locale', lang)
  } catch (error) {
    console.error('Could not save language preference:', error)
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  },
)
</script>

<template>
  <nav class="nav-wrapper" aria-label="Main navigation">
    <button
      type="button"
      class="menu-toggle"
      :class="{ open: isMenuOpen }"
      :aria-expanded="isMenuOpen"
      aria-label="Navigation öffnen oder schließen"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <ul class="navbar" :class="{ 'navbar-open': isMenuOpen }">
      <li>
        <router-link to="/" @click="closeMenu">
          <img :src="homeIcon" :alt="t('nav.home')" class="nav-icon" />
          <span>{{ t('nav.home') }}</span>
        </router-link>
      </li>

      <li>
        <router-link to="/about" @click="closeMenu">
          <img :src="aboutIcon" :alt="t('nav.about')" class="nav-icon" />
          <span>{{ t('nav.about') }}</span>
        </router-link>
      </li>

      <li>
        <router-link to="/services" @click="closeMenu">
          <img :src="servicesIcon" :alt="t('nav.services')" class="nav-icon" />
          <span>{{ t('nav.services') }}</span>
        </router-link>
      </li>

      <li>
        <router-link to="/contact" @click="closeMenu">
          <img :src="contactIcon" :alt="t('nav.contact')" class="nav-icon" />
          <span>{{ t('nav.contact') }}</span>
        </router-link>
      </li>

      <li v-if="!authStore.isAuthenticated">
        <router-link to="/auth/login" @click="closeMenu">
          <img :src="accountIcon" :alt="t('nav.login')" class="nav-icon" />
          <span>{{ t('nav.login') }}</span>
        </router-link>
      </li>

      <li v-else>
        <router-link
          to="/account"
          :class="{ 'active-personal-area': isPersonalAreaRoute() }"
          @click="closeMenu"
        >
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
            aria-label="Switch language to English"
            @click="switchLanguage('en')"
          >
            EN
          </button>

          <button
            type="button"
            class="lang-btn"
            :class="{ active: currentLocale === 'de' }"
            aria-label="Sprache auf Deutsch wechseln"
            @click="switchLanguage('de')"
          >
            DE
          </button>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-wrapper {
  position: relative;
}

.menu-toggle {
  display: none;
  width: 42px;
  height: 38px;
  border: 1px solid rgb(49, 46, 58);
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
  padding: 0.55rem;
}

.menu-toggle span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: #e1e1e1;
  border-radius: 999px;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.menu-toggle span + span {
  margin-top: 6px;
}

.menu-toggle.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle.open span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

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

@media (max-width: 1100px) {
  .menu-toggle {
    display: block;
  }

  .navbar {
    display: none;
    position: absolute;
    top: calc(100% + 0.75rem);
    right: 0;
    z-index: 50;
    min-width: 260px;
    background-color: #202020;
    border: 1px solid rgb(49, 46, 58);
    border-radius: 16px;
    padding: 0.75rem;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
    flex-direction: column;
    align-items: stretch;
  }

  .navbar-open {
    display: flex;
  }

  .navbar li a {
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
  }

  .language-switch-item {
    margin-left: 0;
    margin-top: 0.5rem;
  }

  .language-switch {
    justify-content: center;
  }
}
</style>
