<script setup lang="ts">
import { theme } from '@renderer/func/themeChange'
import AllPrint from '@renderer/components/allPrint.vue'
import PythonorControl from '@renderer/components/python/other/pythonorControl.vue'
import OtherPyControl from '@renderer/components/python/other/otherPyControl.vue'
import PythonControl from  '@renderer/components/python/pythonControl.vue'
import { onMounted, provide, ref } from 'vue'
import type { pythonMessageInter, UnifiedMessage } from '../../../../types/mian'
import AllSelect from '@renderer/components/allSelect.vue'
const mess = ref<UnifiedMessage[]>([])
const python_file = ref<string>()
const time = ref<string>('3')
//设置components
const pyComponents = [PythonorControl, OtherPyControl]
const puppeteerOptions = ref([
  {
    label: 'python爬虫',
    value: 0
  },
  {
    label: '其他',
    value: 1
  }
])
const num = ref<number>(0)
provide('num', num)
provide('options', puppeteerOptions)
//依赖
provide('mess', mess)
provide('all_file', python_file)
provide('time', time)
//接收消息
const handlePythonOutputMessage = (message: pythonMessageInter): void => {
  console.log('接收到pythonOutput消息:', message)
  mess.value.unshift({
    type: 'text',
    data: message
  })
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
  <div
    class="python-page"
    :style="{ borderRight: theme === null ? '1px solid #4e4e4e' : '1px solid  #2c2c2c' }"
  >
    <AllSelect name="python" />
    <PythonControl />
    <KeepAlive>
      <component :is="pyComponents[num]" />
    </KeepAlive>
  </div>
  <AllPrint></AllPrint>
</template>

<style scoped>
.python-page {
  display: flex;
  flex-direction: column;
  width: 320px;
}
</style>
