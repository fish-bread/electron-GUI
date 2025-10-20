<script setup lang="ts">
import { SharpFileInter } from '../../../../../types/sharp'
import { theme } from '@renderer/func/themeChange'
import { computed } from 'vue'
const props = defineProps<{
  state: boolean
  img: string
  data: SharpFileInter | null
}>()
const statusText = computed(() => {
  return props.state ? '修改完成' : '待修改'
})
</script>

<template>
  <div
    class="img-box"
    :style="{
      backgroundColor: theme === null ? '#f8f9fa' : '#1a1a1a'
    }"
  >
    <div class="image-aspect-wrapper">
      <img class="show-image" :src="img" alt="" />
    </div>
    <div
      class="show-data"
      :style="{
        backgroundColor: theme === null ? '#ffffff' : '#1a1a1a'
      }"
    >
      <div
        :class="{
          closed: state,
          warning: !state
        }"
      >
        {{ statusText }}
      </div>
      <n-ellipsis style="max-width: 100%" class="filePath">{{ data?.filePath }}</n-ellipsis>
      <div class="filesize">size:{{ data?.size }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.img-box {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px;
  width: 200px;
  height: 210px;
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.2s ease;

  /* 16:9 图片比例容器 */
  .image-aspect-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%; /* 16:9 比例 */
    border-radius: 6px;
    overflow: hidden;
    margin: 5px 0;
    .show-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
  }
  .show-data {
    flex-shrink: 0;
    width: 100%;
    padding: 5px 5px;
    overflow: hidden;
    transition: all 0.2s ease;
  }
  .error {
    color: var(--error-color) !important;
  }
  .success {
    color: var(--success-color) !important;
  }
  .closed {
    color: var(--closed-color) !important;
  }
  .warning {
    color: var(--warning-color) !important;
  }
}
</style>
