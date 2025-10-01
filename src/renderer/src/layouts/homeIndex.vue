<script setup lang="ts">
import Sidebar from '@renderer/components/sidebar/homeSidebar.vue'
import HomePage from '@renderer/components/home/homePage.vue'
import PythonPage from '@renderer/components/python/pythonPage.vue'
import ScriptPage from '@renderer/components/Script/scriptPage.vue'
import SettingPage from '@renderer/components/settings/settingsPage.vue'
import { ref, provide, onMounted, onBeforeMount } from 'vue'
import HeaderIndex from '@renderer/components/headerIndex.vue'
import { sendTheme } from '@renderer/func/themeChange'
const PyComponents = [HomePage, PythonPage, ScriptPage, SettingPage]
const num = ref<number>(0)
const port = ref<string>('7897')
provide('HomeComponentNum', num)
provide('port', port)
onBeforeMount(() => {
  window.api.sendTheme(sendTheme)
})
onMounted(async () => {
  port.value = await window.api.getPort()
})
</script>

<template>
  <HeaderIndex />
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
