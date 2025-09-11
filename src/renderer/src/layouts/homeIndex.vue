<script setup lang="ts">
import Sidebar from '@renderer/components/sidebar/homeSidebar.vue'
import HomePage from '@renderer/components/home/homePage.vue'
import PythonPage from '@renderer/components/python/pythonPage.vue'
import PuppeteerPage from '@renderer/components/puppeteer/puppeteerPage.vue'
import SettingPage from '@renderer/components/settings/settingsPage.vue'
import { ref, provide } from 'vue'
const PyComponents = [HomePage, PythonPage, PuppeteerPage, SettingPage]
const num = ref<number>(0)
provide('HomeComponentNum', num)
</script>

<template>
  <div class="home-page">
    <Sidebar></Sidebar>
    <KeepAlive>
      <component :is="PyComponents[num]" />
    </KeepAlive>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: row;
}
</style>
