<script setup lang="ts">
import PuppeteerControl from '@renderer/components/puppeteer/puppeteerControl.vue'
import AllPrint from '@renderer/components/allPrint.vue'
import { onMounted, provide, ref } from 'vue'
import type { pythonMessageInter } from '../../../../types/mian'
const jsMess = ref<pythonMessageInter[]>([])
const puppeteer_file = ref<string>()
const time = ref<string>('5')
provide('mess', jsMess)
provide('all_file', puppeteer_file)
provide('time', time)
const handlePythonOutputMessage = (message: pythonMessageInter): void => {
  console.log('接收到pythonOutput消息:', message)
  jsMess.value.unshift(message) // 将新消息添加到数组中，触发UI更新
}
const get_chrome_path = async (): Promise<void> => {
  puppeteer_file.value = await window.api.getChromePath()
}
onMounted(() => {
  // 注册监听器，持续接收主进程发来的 pythonOutput 消息
  window.api.puppeteerOutput(handlePythonOutputMessage)
  get_chrome_path()
})
</script>

<template>
  <PuppeteerControl />
  <AllPrint />
</template>

<style scoped></style>
