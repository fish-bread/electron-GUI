<script setup lang="ts">
import SettingPython from '@renderer/components/settings/settingPython.vue'
import SettingsPuppeteer from '@renderer/components/settings/settingPuppeteer.vue'
import settingsGlobal from '@renderer/components/settings/settingGlobal.vue'
import { ref, onMounted, provide } from 'vue'
//pixiv
const pixivPath = ref<string>()
const pixivCookie = ref<string>()
provide('filePath', pixivPath)
provide('pixivCookie', pixivCookie)
//bilibili
const bilibiliPath = ref<string>()
const bilibiliCookie = ref<string>()
provide('bilibiliFilePath', bilibiliPath)
provide('bilibiliCookie', bilibiliCookie)
onMounted(async () => {
  pixivPath.value = await window.api.getPixivFilePath()
  pixivCookie.value = await window.api.getPixivCookie()
  bilibiliPath.value = await window.api.getBilibiliFilePath()
  bilibiliCookie.value = await window.api.getBilibiliCookie()
})
</script>

<template>
  <div class="setting-page">
    <div class="scroll-box">
      <settingsGlobal />
      <SettingPython />
      <SettingsPuppeteer />
    </div>
  </div>
</template>

<style scoped>
.setting-page {
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
  margin-left: 10px;
}
.scroll-box {
  height: calc(100vh - 50px);
  overflow: auto;
}
</style>
