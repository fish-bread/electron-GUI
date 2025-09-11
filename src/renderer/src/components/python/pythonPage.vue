<script setup lang="ts">
import AllPrint from '@renderer/components/allPrint.vue'
import PythonControl from '@renderer/components/python/pythonControl.vue'
import { onMounted, provide, ref } from 'vue'
import type { pythonMessageInter } from '../../../../types/mian'
const mess = ref<pythonMessageInter[]>([])
const python_file = ref<string>()
const time = ref<string>('5')
//依赖
provide('mess', mess)
provide('all_file', python_file)
provide('time', time)
//接收消息
const handlePythonOutputMessage = (message: pythonMessageInter): void => {
  console.log('接收到pythonOutput消息:', message)
  mess.value.unshift(message) // 将新消息添加到数组中，触发UI更新
}
const get_python_path = async (): Promise<void> => {
  python_file.value = await window.api.getPythonPath()
}
onMounted(() => {
  // 注册监听器，持续接收主进程发来的 pythonOutput 消息
  window.api.pythonOutput(handlePythonOutputMessage)
  get_python_path()
})
</script>

<template>
  <PythonControl></PythonControl>
  <AllPrint></AllPrint>
</template>

<style scoped></style>
