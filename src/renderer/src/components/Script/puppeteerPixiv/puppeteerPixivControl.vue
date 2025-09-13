<script setup lang="ts">
import { inject, onMounted, Ref, ref } from 'vue'
//注入
const time = inject<Ref<string>>('time', ref(''))
const port = inject<Ref<string>>('port', ref(''))
const href = ref('')
const headless = ref<boolean>(true)
const agent = ref<boolean>(true)
//运行puppeteer
const runPuppeteer = async (): Promise<void> => {
  await window.api.runPuppeteer({
    time: Number(time.value),
    href: href.value,
    headless: headless.value,
    useProxy: agent.value,
    port: Number(port.value),
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
    <div class="setting">
      <div class="setting-box">
        <h3>无头模式</h3>
        <n-switch v-model:value="headless" />
      </div>
      <div class="setting-box">
        <h3>网络代理</h3>
        <n-switch v-model:value="agent" />
        <div class="agent">
          端口:
          <div style="max-width: 70px">{{ port }}</div>
        </div>
      </div>
    </div>
    <h3>pixiv脚本预启动时间</h3>
    <n-input v-model:value="time" placeholder="请输入puppeteer预启动时间,默认3秒"></n-input>
    <h3>pixiv的图片pid/图片网址</h3>
    <n-input v-model:value="href" placeholder="请输入你想搜索的图片pid"></n-input>
  </div>
</template>

<style scoped>
.setting {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 10px;
}
.setting-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.agent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
