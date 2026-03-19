<script setup lang="ts">

</script>

<template>
  <router-view :key="$route.fullPath" class="account-view"/>
</template>

<style scoped>
.account-view {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
</style>