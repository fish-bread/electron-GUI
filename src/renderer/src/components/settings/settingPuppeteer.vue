<script setup lang="ts">
import { inject, Ref, ref } from 'vue'
import puppeteerLocalSettings, { PuppeteerSettingsApi } from '@renderer/func/puppeteerLocalSetting'
//pixiv
const pixivApi: PuppeteerSettingsApi = {
  changeFilePath: window.api.changePixivFilePath, // 你的Pixiv修改路径API
  restorePath: window.api.restorePixivPath, // 你的Pixiv恢复路径API
  changeCookie: window.api.changePixivCookie // 你的Pixiv修改Cookie API
}
const pixivPath = inject<Ref<string>>('filePath', ref(''))
const pixivCookie = inject<Ref<string>>('pixivCookie', ref(''))
const pixivSettings = new puppeteerLocalSettings(pixivApi, pixivPath, pixivCookie)
//bilibili
const BilibiliApi: PuppeteerSettingsApi = {
  changeFilePath: window.api.setBilibiliFilePath, // 你的Pixiv修改路径API
  restorePath: window.api.restoreBilibiliFilePath, // 你的Pixiv恢复路径API
  changeCookie: window.api.setBilibiliCookie // 你的Pixiv修改Cookie API
}
const bilibiliFilePath = inject<Ref<string>>('bilibiliFilePath', ref(''))
const bilibiliCookie = inject<Ref<string>>('bilibiliCookie', ref(''))
const bilibiliSettings = new puppeteerLocalSettings(BilibiliApi, bilibiliFilePath, bilibiliCookie)
</script>

<template>
  <div class="puppeteer-setting">
    <h2>puppeteer设置</h2>
    <h3>pixiv爬虫设置</h3>
    <div class="pixiv-cookie">
      <n-tooltip :show-arrow="false" trigger="hover">
        <template #trigger>
          <div class="pixiv-cookie-view">pixiv的cookie:&nbsp;&nbsp;{{ pixivCookie }}</div>
        </template>
        {{ pixivCookie }}
      </n-tooltip>
      <n-input
        v-model:value="pixivSettings.changeCookie.value"
        placeholder="请输入pixivCookie"
        style="max-width: 50%"
      />
      <n-button @click="pixivSettings.changeCookieFunc">更换cookie</n-button>
    </div>
    <div class="path">
      pixiv图片保存文件路径:&nbsp;&nbsp;{{ pixivPath }}
      <n-button @click="pixivSettings.changeFilePathFunc">修改文件路径</n-button>
      <n-button @click="pixivSettings.restoreFilePathFunc">恢复默认路径</n-button>
    </div>
    <h3>bilibili爬虫设置</h3>
    <div class="pixiv-cookie">
      <n-tooltip :show-arrow="false" trigger="hover">
        <template #trigger>
          <div class="pixiv-cookie-view">bilibili的cookie:&nbsp;&nbsp;{{ bilibiliCookie }}</div>
        </template>
        {{ bilibiliCookie }}
      </n-tooltip>
      <n-input
        v-model:value="bilibiliSettings.changeCookie.value"
        placeholder="请输入bilibiliCookie"
        style="max-width: 50%"
      />
      <n-button @click="bilibiliSettings.changeCookieFunc">更换cookie</n-button>
    </div>
    <div class="path">
      bilibili视频保存文件路径:&nbsp;&nbsp;{{ bilibiliFilePath }}
      <n-button @click="bilibiliSettings.changeFilePathFunc">修改文件路径</n-button>
      <n-button @click="bilibiliSettings.restoreFilePathFunc">恢复默认路径</n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.path {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
.pixiv-cookie {
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  overflow: hidden;
  white-space: nowrap;
  .pixiv-cookie-view {
    max-width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
