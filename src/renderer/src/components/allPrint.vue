<script setup lang="ts">
import AllFilePath from '@renderer/components/allFilePath.vue'
import { onMounted, ref, inject, Ref } from 'vue'
import { watchThrottled, useElementSize } from '@vueuse/core'
import { theme } from '@renderer/func/themeChange'
import { allProgressInter, pythonMessageInter, UnifiedMessage } from '../../../types/mian'
const messageListContainer = ref<HTMLElement | null>(null)
const pythonPrintRef = ref<HTMLElement | null>(null)
const viewportHeightInPixels = window.innerHeight
//引入mess
const mess = inject<Ref<UnifiedMessage[]>>('mess', ref([]))
//滚动
const scrollToBottom = (): void => {
  if (messageListContainer.value) {
    messageListContainer.value.scrollTo({
      top: messageListContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}
//自动滚动
const watchUlFunc = (): void => {
  const { height } = useElementSize(pythonPrintRef)
  watchThrottled(
    height,
    (newValue: number): void => {
      if (newValue > viewportHeightInPixels) {
        console.log('高度', newValue)
        scrollToBottom()
      }
    },
    {
      immediate: true,
      throttle: 100
    }
  )
}
onMounted(() => {
  watchUlFunc()
})
</script>

<template>
  <div class="python-print">
    <AllFilePath />
    <!--输出内容-->
    <div ref="messageListContainer" class="ul-box">
      <ul ref="pythonPrintRef" class="message-list">
        <li
          v-for="(item, index) in mess"
          :key="index"
          :class="{
            error: mess[index].data.status === 'error',
            success: mess[index].data.status === 'success',
            closed: mess[index].data.status === 'closed'
          }"
          :style="{
            '--success-color': theme === null ? '#2c2c2c' : '#ffffff'
          }"
        >
          <template v-if="item.type === 'text'">
            {{ (item.data as pythonMessageInter).message }}
          </template>
          <template v-if="item.type === 'progress'">
            <div>{{ (item.data as allProgressInter).message }}</div>
            <n-progress
              :style="{
                maxWidth: '90%'
              }"
              type="line"
              color="#8064a9"
              :percentage="(item.data as allProgressInter).progress"
            />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
:root {
  --success-color: '#2c2c2c';
}
.python-print {
  flex: 1;
}
.ul-box {
  height: calc(100vh - 50px - 23px);
  overflow: auto;
  font-size: 16px;
}
.message-list {
  display: flex;
  flex-direction: column-reverse;
  min-height: 100%;
}
ul,
li {
  list-style-type: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ul {
  padding: 0 0 0 20px;
}
li {
  margin-bottom: 5px;
  transition: color 0.2s ease;
}
.error {
  color: red;
}
.success {
  color: var(--success-color);
}
.closed {
  color: green;
}
</style>
