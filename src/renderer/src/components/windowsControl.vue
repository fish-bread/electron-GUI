<script setup lang="ts">
import Subtract20Regular from '@vicons/fluent/Subtract20Regular'
import Maximize20Regular from '@vicons/fluent/Maximize20Regular'
import Dismiss20Regular from '@vicons/fluent/Dismiss20Regular'
//最大化
const maxSizeFunc = (): void => window.api.maxSizeFunc()
//最小化
const minimizeFunc = (): void => window.api.minimizeFunc()
//关闭
const closeWindowFunc = (): void => window.api.closeWindowFunc()
</script>

<template>
  <div class="windows-drag">
    <n-tooltip :show-arrow="false" trigger="hover">
      <template #trigger>
        <n-icon size="30" class="cursorPointer" @click="minimizeFunc">
          <Subtract20Regular />
        </n-icon>
      </template>
      最小化
    </n-tooltip>
    <n-tooltip :show-arrow="false" trigger="hover">
      <template #trigger>
        <n-icon size="30" class="cursorPointer" @click="maxSizeFunc">
          <Maximize20Regular />
        </n-icon>
      </template>
      控制窗体
    </n-tooltip>
    <n-tooltip :show-arrow="false" trigger="hover">
      <template #trigger>
        <n-icon size="30" class="cursorPointer" @click="closeWindowFunc">
          <Dismiss20Regular />
        </n-icon>
      </template>
      关闭窗体
    </n-tooltip>
  </div>
</template>

<style scoped>
.windows-drag {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>
