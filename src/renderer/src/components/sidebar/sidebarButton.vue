<script setup lang="ts">
import Home20Filled from '@vicons/fluent/Home20Filled'
import Python from '@vicons/fa/Python'
import JsSquare from '@vicons/fa/JsSquare'
import Settings20Filled from '@vicons/fluent/Settings20Filled'
import { inject, Ref } from 'vue'
import { theme } from '@renderer/func/themeChange'
// 定义按钮项的接口
interface ButtonItem {
  icon: unknown
  text: string
}

const num = inject<Ref<number>>('HomeComponentNum')

// 按钮配置数组
const buttonItems: ButtonItem[] = [
  { icon: Home20Filled, text: '主页' },
  { icon: Python, text: 'python' },
  { icon: JsSquare, text: 'js脚本' },
  { icon: Settings20Filled, text: '设置' },
]

const changHomeFunc = (index: number): void => {
  if (num) num.value = index
}
</script>

<template>
  <div class="sidebar-body">
    <!-- 使用 v-for 遍历渲染按钮 -->
    <div
      v-for="(item, index) in buttonItems"
      :key="index"
      class="sidebar-button cursorPointer"
      :class="{
        'sidebar-button-active': num === index
      }"
      :style="{
        '--sidebar-button-active-back': theme === null ? '#9983ba' : '#8064a9'
      }"
      @click="changHomeFunc(index)"
    >
      <!--动态渲染图标组件-->
      <n-icon size="30">
        <component :is="item.icon" />
      </n-icon>
      <!--显示按钮文本-->
      {{ item.text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
:root {
  --sidebar-button-active-back: '#f2f0f6';
}
.sidebar-body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  .sidebar-button {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.2s ease;
    width: 100%;
    border-left: 5px solid transparent;
  }
  .sidebar-button-active {
    position: relative;
  }
  .sidebar-button-active::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 0;
    width: 10px;
    height: 100%;
    border-left: 5px solid var(--sidebar-button-active-back) !important;
  }
  .sidebar-button:hover {
    border-left: 5px solid var(--sidebar-button-active-back) !important;
  }
}
</style>
