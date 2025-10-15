<script setup lang="ts">
import { theme } from '@renderer/func/themeChange'
import { pageTitleInter } from '../../../types/renderer'
const title = defineModel<pageTitleInter[]>('title')
const num = defineModel<number>('num')
const changeShow = (index: number): void => {
  num.value = index
}
</script>

<template>
  <div
    class="setting-page-content"
    :style="{
      borderRight: theme === null ? '1px solid #4e4e4e' : '1px solid  #2c2c2c'
    }"
  >
    <div
      v-for="(item, index) in title"
      :key="index"
      class="sidebar-button cursorPointer"
      :class="{
        'sidebar-button-active': num === index
      }"
      :style="{
        '--sidebar-button-active-back': theme === null ? '#9983ba' : '#8064a9',
        padding: '5px 3px',
        fontSize: '15px'
      }"
      @click="changeShow(index)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style scoped>
.setting-page-content {
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 120px;
}
</style>
