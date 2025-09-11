<script setup lang="ts">
import { theme } from '@renderer/func/themeChange'
import { ref, inject, Ref } from 'vue'
import { pythonMessageInter } from '../../../../types/mian'
import { useMessage } from 'naive-ui'
const message = useMessage()
//注入
const python_file = inject<Ref<string>>('all_file', ref(''))
const mess = inject<Ref<pythonMessageInter[]>>('mess')
const python_time = inject<Ref<string>>('time', ref('5'))
const python = async (): Promise<void> => {
  const result = await window.api.runPython(Number(python_time.value))
  console.log(result)
}
const kill_python = async (): Promise<void> => {
  const result = await window.api.killPython()
  console.log(result)
}
const clean_python = (): void => {
  if (mess) mess.value = []
}
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
</script>

<template>
  <div
    class="home-control"
    :style="{ borderRight: theme === null ? '1px solid #4e4e4e' : '1px solid  #2c2c2c' }"
  >
    <h3>python控制台</h3>
    <n-button @click="python">启动python</n-button>
    <n-button @click="kill_python">killPython</n-button>
    <n-button @click="clean_python">清除打印台</n-button>
    <h3>python脚本预启动时间</h3>
    <n-input v-model:value="python_time" placeholder="请输入python预启动时间,默认3秒"/>
    <h2>python自定义文件运行路径</h2>
    <n-button @click="choose_python">选择python路径</n-button>
    <n-button @click="restore_python">还原python路径</n-button>
  </div>
</template>

<style scoped>
.home-control {
  width: 300px;
}
</style>
