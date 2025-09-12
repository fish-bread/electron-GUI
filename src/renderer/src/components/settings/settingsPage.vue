<script setup lang="ts">
import SettingPython from '@renderer/components/settings/settingPython.vue'
import SettingsPuppeteer from '@renderer/components/settings/settingPuppeteer.vue'
import { ref, onMounted, provide } from 'vue'
const pixivPath = ref<string>()
const pixivCookie = ref<string>()
provide('filePath', pixivPath)
provide('pixivCookie',pixivCookie)
onMounted(async () => {
  pixivPath.value = await window.api.getPixivFilePath()
  pixivCookie.value = await window.api.getPixivCookie()
})
</script>

<template>
  <div class="setting-page">
    <div class="scroll-box">
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
  height: calc(100vh - 50px - 23px);
  overflow: auto;
}
</style>
