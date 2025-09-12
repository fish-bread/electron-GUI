<script setup lang="ts">
import { ref, inject, Ref } from 'vue'
//注入
const python_time = inject<Ref<string>>('time', ref('3'))
const python = async (): Promise<void> => {
  const result = await window.api.runPython(Number(python_time.value))
  console.log(result)
}
const kill_python = async (): Promise<void> => {
  const result = await window.api.killPython()
  console.log(result)
}
</script>

<template>
  <div class="home-control">
    <h3>python控制台</h3>
    <n-button @click="python">启动python</n-button>
    <n-button @click="kill_python">killPython</n-button>
    <h3>python脚本预启动时间</h3>
    <n-input v-model:value="python_time" placeholder="请输入python预启动时间,默认3秒"/>
  </div>
</template>

<style scoped>
.home-control {
  width: 300px;
}
</style>
