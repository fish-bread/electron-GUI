<script setup lang="ts">
import Subtract20Regular from '@vicons/fluent/Subtract20Regular'
import Maximize20Regular from '@vicons/fluent/Maximize20Regular'
import Dismiss20Regular from '@vicons/fluent/Dismiss20Regular'
import { theme } from '@renderer/func/themeChange'
//最大化
const maxSizeFunc = (): void => window.api.maxSizeFunc()
//最小化
const minimizeFunc = (): void => window.api.minimizeFunc()
//关闭
const closeWindowFunc = (): void => {
  window.api.closeWindowFunc()
}
defineProps<{
  iconSize: string
}>()
</script>

<template>
  <div class="windows-drag" :data-theme="theme === null ? 'light' : 'dark'">
    <div class="app-drag window-left"></div>
    <div class="window-right">
      <div class="control-button cursorPointer" @click="minimizeFunc">
        <n-icon :size="iconSize">
          <Subtract20Regular />
        </n-icon>
      </div>
      <div class="control-button cursorPointer" @click="maxSizeFunc">
        <n-icon :size="iconSize">
          <Maximize20Regular />
        </n-icon>
      </div>
      <div class="control-button cursorPointer close" @click="closeWindowFunc">
        <n-icon :size="iconSize">
          <Dismiss20Regular />
        </n-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.windows-drag {
  display: flex;
  align-items: center;
  gap: 0;
  .window-left {
    flex: 1;
    width: 100%;
    height: 40px;
  }
  .window-right {
    display: flex;
    flex-direction: row;
  }
}
.control-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  transition: all 0.2s ease;
  &:hover {
    background-color: var(--button-hover-color);
  }
}
.close {
  &:hover {
    background-color: #c42b1c !important;
  }
}
</style>
