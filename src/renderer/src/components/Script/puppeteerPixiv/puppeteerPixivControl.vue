<script setup lang="ts">
import { inject, Ref, ref } from 'vue'
//注入
const time = inject<Ref<string>>('time', ref(''))
const href = ref('')
const headless = ref<boolean>(true)
//运行puppeteer
const runPuppeteer = async (): Promise<void> => {
  await window.api.runPuppeteer({
    time: Number(time.value),
    href: href.value,
    headless: headless.value
  })
}
//killPuppeteer
const killPuppeteer = async (): Promise<void> => {
  await window.api.killPuppeteer()
}
</script>

<template>
  <div class="home-control">
    <h3>pixiv控制台</h3>
    <n-button @click="runPuppeteer">运行pixiv脚本</n-button>
    <n-button @click="killPuppeteer">killPixiv脚本</n-button>
    <h3>是否启用无头模式</h3>
    <n-switch v-model:value="headless" />
    <h3>pixiv脚本预启动时间</h3>
    <n-input v-model:value="time" placeholder="请输入puppeteer预启动时间,默认3秒"></n-input>
    <h3>pixiv的图片pid/图片网址</h3>
    <n-input v-model:value="href" placeholder="请输入你想搜索的图片pid"></n-input>
  </div>
</template>

<style scoped></style>
