<script setup lang="ts">
import { inject, Ref, ref } from 'vue'
const time = inject<Ref<string>>('time', ref(''))
const port = inject<Ref<string>>('port', ref(''))
const href = ref('')
const headless = ref<boolean>(true)
const runPuppeteer = (): void => {
  window.api.runBilibiliPuppeteer({
    time: Number(time.value),
    href: href.value,
    headless: headless.value,
    useProxy: false,
    port: port.value,
  })
}
const killPuppeteer = (): void => {
  window.api.killBilibiliPuppeteer()
}
</script>

<template>
  <div class="bili-control">
    <h3>bilibili爬虫控制台</h3>
    <n-button @click="runPuppeteer">运行bilibili脚本</n-button>
    <n-button @click="killPuppeteer">killBilibili脚本</n-button>
    <div class="setting-box">
      <h3>无头模式</h3>
      <n-switch v-model:value="headless" />
    </div>
    <h3>bilibili视频或bv号网址</h3>
    <n-input v-model:value="href" placeholder="请输入你想搜索的bv号视频"></n-input>
  </div>
</template>

<style scoped>

</style>
