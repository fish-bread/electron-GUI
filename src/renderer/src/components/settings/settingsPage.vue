<script setup lang="ts">
import settingScript from '@renderer/components/settings/settingScript.vue'
import settingsGlobal from '@renderer/components/settings/settingGlobal.vue'
import settingPython from '@renderer/components/settings/settingPython.vue'
import pageControl from '@renderer/components/pageControl.vue'
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
  pixivPath.value = await window.pixivApi.getPixivFilePath()
  pixivCookie.value = await window.pixivApi.getPixivCookie()
  bilibiliPath.value = await window.bilibiliApi.getBilibiliFilePath()
  bilibiliCookie.value = await window.bilibiliApi.getBilibiliCookie()
})
import puppeteerLocalSettings, { PuppeteerSettingsApi } from '@renderer/func/puppeteerLocalSetting'
import { settingTitle } from '../../../../types/mian'
import { pageTitleInter } from '../../../../types/renderer'
//pixiv
const pixivApi: PuppeteerSettingsApi = {
  changeFilePath: window.pixivApi.changePixivFilePath, // 你的Pixiv修改路径API
  restorePath: window.pixivApi.restorePixivPath, // 你的Pixiv恢复路径API
  changeCookie: window.pixivApi.changePixivCookie // 你的Pixiv修改Cookie API
}
const pixivSettings = new puppeteerLocalSettings(pixivApi, pixivPath, pixivCookie)
//bilibili
const BilibiliApi: PuppeteerSettingsApi = {
  changeFilePath: window.bilibiliApi.setBilibiliFilePath, // 你的Pixiv修改路径API
  restorePath: window.bilibiliApi.restoreBilibiliFilePath, // 你的Pixiv恢复路径API
  changeCookie: window.bilibiliApi.setBilibiliCookie // 你的Pixiv修改Cookie API
}
const bilibiliSettings = new puppeteerLocalSettings(BilibiliApi, bilibiliPath, bilibiliCookie)
//标题
const title = ref<settingTitle>({
  pixiv: 'pixiv',
  bilibili: 'bilibili'
})
//切换页面
const setting_title = ref<pageTitleInter[]>([
  { title: '全局设置', value: 0 },
  { title: 'python设置', value: 1 },
  { title: 'pixiv设置', value: 2 },
  { title: 'bilibili设置', value: 3 }
])
const num = ref<number>(0)
</script>

<template>
  <div class="setting-page">
    <pageControl v-model:num="num" v-model:title="setting_title" />
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
.scroll-box {
  box-sizing: border-box;
  height: calc(100vh - 50px);
  overflow: auto;
  padding-left: 10px;
}
</style>
