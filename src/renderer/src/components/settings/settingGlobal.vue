<script setup lang="ts">
import { ref, inject } from 'vue'
const port = inject('port', ref(''))
import { useMessage } from 'naive-ui'
const message = useMessage()
const setPort = (): void => {
  try {
    window.api.setPort(port.value)
    message.success('修改成功')
  } catch (e) {
    console.error(e)
    message.error('修改失败')
  }
}
</script>

<template>
  <div>
    <h2>全局设置</h2>
    <div class="port-setting">
      全局代理端口:&nbsp;{{ port }}
      <n-input v-model:value="port" placeholder="端口号" style="max-width: 30%" />
      <n-button @click="setPort">修改全局端口</n-button>
    </div>
  </div>
</template>

<style scoped>
.port-setting {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
</style>
