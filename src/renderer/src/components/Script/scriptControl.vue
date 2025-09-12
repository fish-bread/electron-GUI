<script setup lang="ts">
import { inject, ref, Ref } from 'vue'
import { useMessage } from 'naive-ui'
import { pythonMessageInter } from '../../../../types/mian'
const message = useMessage()
//注入
const mess = inject<Ref<pythonMessageInter[]>>('mess')
const chrome_file = inject<Ref<string>>('all_file', ref(''))
//选择浏览器
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
//重置浏览器
const restore_chrome = async (): Promise<void> => {
  chrome_file.value = await window.api.restorePuppeteerPath()
  message.success('路径还原成功')
}
//清除控制台
const clean_puppeteer = (): void => {
  if (mess) mess.value = []
}
</script>

<template>
  <div>
    <h3>puppeteer控制台</h3>
    <n-button @click="clean_puppeteer">清除控制台</n-button>
    <h3>puppeteer浏览器启动路径</h3>
    <n-button @click="choose_chrome">选择谷歌浏览器路径</n-button>
    <n-button @click="restore_chrome">还原谷歌浏览器路径</n-button>
  </div>
</template>

<style scoped>

</style>
