<script setup lang="ts">
import settingScript from '@renderer/components/settings/settingScript.vue'
import settingsGlobal from '@renderer/components/settings/settingGlobal.vue'
import { ref, onMounted, provide, Ref } from 'vue'
//pixiv
const pixivPath = ref<string>('')
const pixivCookie = ref<string>('')
provide('filePath', pixivPath)
provide('pixivCookie', pixivCookie)
//bilibili
const bilibiliPath = ref<string>('')
const bilibiliCookie = ref<string>('')
provide('bilibiliFilePath', bilibiliPath)
provide('bilibiliCookie', bilibiliCookie)
onMounted(async () => {
  pixivPath.value = await window.api.getPixivFilePath()
  pixivCookie.value = await window.api.getPixivCookie()
  bilibiliPath.value = await window.api.getBilibiliFilePath()
  bilibiliCookie.value = await window.api.getBilibiliCookie()
})
import puppeteerLocalSettings, { PuppeteerSettingsApi } from '@renderer/func/puppeteerLocalSetting'
import { settingTitle } from '../../../../types/mian'
//pixiv
const pixivApi: PuppeteerSettingsApi = {
  changeFilePath: window.api.changePixivFilePath, // 你的Pixiv修改路径API
  restorePath: window.api.restorePixivPath, // 你的Pixiv恢复路径API
  changeCookie: window.api.changePixivCookie // 你的Pixiv修改Cookie API
}
const pixivSettings = new puppeteerLocalSettings(pixivApi, pixivPath, pixivCookie)
//bilibili
const BilibiliApi: PuppeteerSettingsApi = {
  changeFilePath: window.api.setBilibiliFilePath, // 你的Pixiv修改路径API
  restorePath: window.api.restoreBilibiliFilePath, // 你的Pixiv恢复路径API
  changeCookie: window.api.setBilibiliCookie // 你的Pixiv修改Cookie API
}
const bilibiliSettings = new puppeteerLocalSettings(BilibiliApi, bilibiliPath, bilibiliCookie)
//标题
const title = ref<settingTitle>({
  pixiv: 'pixiv',
  bilibili: 'bilibili'
})
</script>

<template>
  <div class="setting-page">
    <div class="scroll-box">
      <settingsGlobal />
      <settingScript
        v-model:title="title.pixiv"
        v-model:path="pixivPath"
        v-model:cookie="pixivCookie"
        v-model:settings="pixivSettings"
      />
      <settingScript
        v-model:title="title.bilibili"
        v-model:path="bilibiliPath"
        v-model:cookie="bilibiliCookie"
        v-model:settings="bilibiliSettings"
      />
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
