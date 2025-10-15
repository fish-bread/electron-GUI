<script setup lang="ts">
import { SharpFileInter } from '../../../../../types/sharp'
import { theme } from '@renderer/func/themeChange'
defineProps<{
  img: string
  data: SharpFileInter | null
}>()
</script>

<template>
  <div
    class="img-box"
    :style="{
      backgroundColor: theme === null ? '#f8f9fa' : '#1a1a1a'
    }"
  >
    <img class="show-image" :src="img" alt="" />
    <div
      class="show-data"
      :style="{
        backgroundColor: theme === null ? '#ffffff' : '#1a1a1a'
      }"
    >
      <div style="text-overflow: ellipsis">{{ data?.filePath }}</div>
      <div>图片的大小{{ data?.size }}</div>
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
  height: 280px;
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.2s ease;
  .show-image {
    flex: 1;
    width: 100%;
    min-height: 120px;
    max-height: 300px;
    object-fit: contain;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.2s ease;
  }
  .show-data {
    flex-shrink: 0;
    width: 100%;
    padding: 8px 0;
    overflow: hidden;
    transition: all 0.2s ease;
  }
}
</style>
