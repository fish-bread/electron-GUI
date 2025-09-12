<script setup lang="ts">
import PuppeteerControl from '@renderer/components/puppeteer/puppeteerControl.vue'
import AllPrint from '@renderer/components/allPrint.vue'
import { onMounted, provide, ref } from 'vue'
import type { pythonMessageInter, allProgressInter, UnifiedMessage } from '../../../../types/mian'
const jsMess = ref<UnifiedMessage[]>([])
const puppeteer_file = ref<string>()
const time = ref<string>('3')
provide('mess', jsMess)
provide('all_file', puppeteer_file)
provide('time', time)
const handleOutputMessage = (message: pythonMessageInter): void => {
  console.log('接收到pythonOutput消息:', message)
  jsMess.value.unshift({
    type: 'text',
    data: message
  })
}
const handleProgressUpdate = (message: allProgressInter): void => {
  if (!message.taskId) return
  // 查找是否已存在该任务
  const existingTaskIndex = jsMess.value.findIndex(
    (item) => item.type === 'progress' && (item.data as allProgressInter).taskId === message.taskId
  )
  if (existingTaskIndex >= 0) {
    // 更新现有任务
    ;(jsMess.value[existingTaskIndex].data as allProgressInter).progress = message.progress
    jsMess.value[existingTaskIndex].data.status = message.status
  } else {
    // 添加新任务
    jsMess.value.unshift({
      type: 'progress',
      data: message
    })
  }
}
const get_chrome_path = async (): Promise<void> => {
  puppeteer_file.value = await window.api.getChromePath()
}
onMounted(() => {
  // 注册监听器，持续接收主进程发来的 pythonOutput 消息
  window.api.puppeteerOutput(handleOutputMessage)
  window.api.puppeteerOutProgress(handleProgressUpdate)
  get_chrome_path()
})
</script>

<template>
  <PuppeteerControl />
  <AllPrint />
</template>

<style scoped></style>
