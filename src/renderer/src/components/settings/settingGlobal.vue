<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
const port = inject('port', ref(''))
const inputPort = ref<string>('7897')
import { useMessage } from 'naive-ui'
const message = useMessage()
const setPort = async (): Promise<void> => {
  try {
    window.api.setPort(inputPort.value)
    message.success('修改成功')
    port.value = await window.api.getPort()
  } catch (e) {
    console.error(e)
    message.error('修改失败')
  }
}
onMounted(() => {
  inputPort.value = port.value
})
</script>

<template>
  <div>
    <h2>全局设置</h2>
    <div class="port-setting">
      全局代理端口:&nbsp;{{ port }}
      <n-input v-model:value="inputPort" placeholder="端口号" style="max-width: 30%" />
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
