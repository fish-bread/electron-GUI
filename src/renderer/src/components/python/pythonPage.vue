<script setup lang="ts">
import { theme } from '@renderer/func/themeChange'
import AllPrint from '@renderer/components/allPrint.vue'
import AirtestControl from '@renderer/components/python/airtest/airtestControl.vue'
import CustomPyControl from '@renderer/components/python/custom/customPyControl.vue'
import PythonControl from '@renderer/components/python/pythonControl.vue'
import { onMounted, provide, ref } from 'vue'
import type { pythonMessageInter, UnifiedMessage } from '../../../../types/mian'
import AllSelect from '@renderer/components/allSelect.vue'
import { watchThrottled } from '@vueuse/core'
const mess = ref<UnifiedMessage[]>([])
const python_file = ref<string>()
const time = ref<string>('3')
//设置components
const pyComponents = [AirtestControl, CustomPyControl]
const puppeteerOptions = ref([
  {
    label: 'python爬虫',
    value: 0
  },
  {
    label: '自定义爬虫',
    value: 1
  }
])
const num = ref<number>(0)
provide('num', num)
provide('options', puppeteerOptions)
//设置路径名
const pathName = ref<string>('python')
provide('pathName',pathName)
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
const get_custom_path = async (): Promise<void> => {
  python_file.value = await window.api.getCustomPythonPath()
}
//监听num
const watchNum = (): void => {
  watchThrottled(
    num,
    (newValue: number): void => {
      switch (newValue) {
        case 0:
          get_python_path()
          break
        case 1:
          get_custom_path()
          break
      }
    },
    { immediate: true, throttle: 100 }
  )
}
onMounted(() => {
  // 注册监听器，持续接收主进程发来的 pythonOutput 消息
  window.api.pythonOutput(handlePythonOutputMessage)

  watchNum()
})
const split = ref(0.265)
</script>

<template>
  <n-split v-model:size="split" direction="horizontal">
    <template #1>
      <div
        class="python-page"
        :style="{ borderRight: theme === null ? '1px solid #4e4e4e' : '1px solid  #2c2c2c' }"
      >
        <div class="script-box">
          <AllSelect name="python" />
          <PythonControl />
          <KeepAlive>
            <component :is="pyComponents[num]" />
          </KeepAlive>
        </div>
      </div>
    </template>
    <template #2>
      <AllPrint />
    </template>
  </n-split>
</template>

<style scoped>
.python-page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100vh - 50px);
  padding: 0 10px;
}
.python-page::-webkit-scrollbar {
  width: 5px;
}
</style>
