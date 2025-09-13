<script setup lang="ts">
import { ref, inject, Ref } from 'vue'
import { useMessage } from 'naive-ui'
const message = useMessage()
const python_file = inject<Ref<string>>('all_file', ref(''))
const choose_python = async (): Promise<void> => {
  const newPath = await window.api.choosePython()
  if (newPath.canceled) {
    python_file.value = await window.api.getPythonPath()
    message.error('未选择python启动路径')
  } else {
    console.log('文件路径', newPath)
    python_file.value = newPath.filePath
    message.success('路径选择成功')
  }
}
const restore_python = async (): Promise<void> => {
  python_file.value = await window.api.restorePythonPath()
  message.success('路径还原成功')
}
const python = (): void => {
  window.api.runCustomPython()
}
const kill_python = (): void => {
  window.api.killCustomPython()
}
</script>

<template>
  <h3>自定义python控制台</h3>
  <n-button @click="python">启动python</n-button>
  <n-button @click="kill_python">killPython</n-button>
  <h3>自定义文件运行路径</h3>
  <n-button @click="choose_python">选择python路径</n-button>
  <n-button @click="restore_python">还原python路径</n-button>
  <h4>注:自定义脚本须自行解决中文打印乱码的问题</h4>
  <h4>推荐转化为utf-8编码</h4>
</template>

<style scoped></style>
