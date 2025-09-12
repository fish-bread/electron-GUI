<script setup lang="ts">
import { theme } from '@renderer/func/themeChange'
import { inject, Ref, ref } from 'vue'
import { pythonMessageInter } from '../../../../types/mian'
import { useMessage } from 'naive-ui'
const message = useMessage()
//注入
const mess = inject<Ref<pythonMessageInter[]>>('mess')
const time = inject<Ref<string>>('time', ref(''))
const chrome_file = inject<Ref<string>>('all_file', ref(''))
const href = ref('')
const headless = ref<boolean>(true)
const runPuppeteer = async (): Promise<void> => {
  await window.api.runPuppeteer({
    time: Number(time.value),
    href: href.value,
    headless: headless.value,
  })
}
const killPuppeteer = async (): Promise<void> => {
  await window.api.killPuppeteer()
}
const choose_chrome = async (): Promise<void> => {
  const newPath = await window.api.changePuppeteer()
  if (newPath.canceled) {
    chrome_file.value = await window.api.getChromePath()
    message.error('未选择python启动路径')
  } else {
    console.log('文件路径', newPath)
    chrome_file.value = newPath.filePath
    message.success('路径选择成功')
  }
}
const restore_chrome = async (): Promise<void> => {
  chrome_file.value = await window.api.restorePuppeteerPath()
  message.success('路径还原成功')
}
const clean_puppeteer = (): void => {
  if (mess) mess.value = []
}
</script>

<template>
  <div
    class="home-control"
    :style="{ borderRight: theme === null ? '1px solid #4e4e4e' : '1px solid  #2c2c2c' }"
  >
    <h3>puppeteer控制台</h3>
    <n-button @click="runPuppeteer">运行puppeteer</n-button>
    <n-button @click="killPuppeteer">killPuppeteer</n-button>
    <n-button @click="clean_puppeteer">清除控制台</n-button>
    <h3>puppeteer浏览器启动路径</h3>
    <n-button @click="choose_chrome">选择谷歌浏览器路径</n-button>
    <n-button @click="restore_chrome">还原谷歌浏览器路径</n-button>
    <h3>是否启用无头模式</h3>
    <n-switch v-model:value="headless" />
    <h3>puppeteer预启动时间</h3>
    <n-input v-model:value="time" placeholder="请输入puppeteer预启动时间,默认3秒"></n-input>
    <h3>pixiv的图片pid/图片网址</h3>
    <n-input v-model:value="href" placeholder="请输入你想搜索的图片pid"></n-input>
  </div>
</template>

<style scoped>
.home-control {
  width: 300px;
}
</style>
