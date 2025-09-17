<script setup lang="ts">
import { ref, inject, Ref } from 'vue'
//注入
const python_time = inject<Ref<string>>('time', ref('3'))
const python = (): void => {
  window.api.runPython(Number(python_time.value))
}
const kill_python = (): void => {
  window.api.killPython()
}
</script>

<template>
  <div class="home-control">
    <h3>airtest控制台</h3>
    <n-button @click="python">启动Airtest</n-button>
    <n-button @click="kill_python">killAirtest</n-button>
    <h3>airtest脚本预启动时间</h3>
    <n-input v-model:value="python_time" placeholder="请输入airtest预启动时间,默认3秒" />
  </div>
</template>

<style scoped>
</style>
