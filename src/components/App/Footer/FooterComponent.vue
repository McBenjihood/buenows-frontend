<script setup lang="ts">
import NavBarComponent from '@/components/App/Header/NavBarComponent.vue'
import LogoComponent from '@/components/App/Header/LogoComponent.vue'
import NavigationComponent from '@/components/App/Footer/NavigationComponent.vue'
import CopyrightComponent from '@/components/App/Footer/CopyrightComponent.vue'
</script>

<template>
  <footer class="footer">
    <LogoComponent />
    <CopyrightComponent/>
    <NavigationComponent />
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
