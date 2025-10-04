<script setup lang="ts">
import settingScript from '@renderer/components/settings/settingScript.vue'
import settingsGlobal from '@renderer/components/settings/settingGlobal.vue'
import settingPython from '@renderer/components/settings/settingPython.vue'
import { ref, onMounted, provide } from 'vue'
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
import { theme } from '@renderer/func/themeChange'
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
//替换
const setting_title = ref([
  { title: '全局设置', value: 0 },
  { title: 'python设置', value: 1 },
  { title: 'pixiv设置', value: 2 },
  { title: 'bilibili设置', value: 3 }
])
const num = ref<number>(0)
const changeShow = (index: number): void => {
  num.value = index
}
</script>

<template>
  <div class="setting-page">
    <div class="setting-page-content">
      <div
        v-for="(item, index) in setting_title"
        :key="index"
        class="sidebar-button cursorPointer"
        :class="{
          'sidebar-button-active': num === index
        }"
        :style="{
          '--sidebar-button-active-back': theme === null ? '#9983ba' : '#8064a9',
          padding: '5px 3px',
          fontSize: '15px',
        }"
        @click="changeShow(index)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="scroll-box">
      <settingsGlobal v-show="num === 0" />
      <settingPython v-show="num === 1" />
      <settingScript
        v-show="num === 2"
        v-model:title="title.pixiv"
        v-model:path="pixivPath"
        v-model:cookie="pixivCookie"
        v-model:settings="pixivSettings"
      />
      <settingScript
        v-show="num === 3"
        v-model:title="title.bilibili"
        v-model:path="bilibiliPath"
        v-model:cookie="bilibiliCookie"
        v-model:settings="bilibiliSettings"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.setting-page {
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.setting-page-content {
  box-sizing: border-box;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.scroll-box {
  height: calc(100vh - 50px);
  overflow: auto;
}
</style>
