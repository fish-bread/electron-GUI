<script setup lang="ts">
import { inject, Ref, ref } from 'vue'
const pixivPath = inject<Ref<string>>('filePath', ref(''))
import { useMessage } from 'naive-ui'
const message = useMessage()
const changeFilePath = async (): Promise<void> => {
  const newPath = await window.api.changePixivFilePath()
  if (newPath.canceled) {
    message.error('未选择pixiv图片保存路径')
  } else {
    console.log('文件路径', newPath)
    pixivPath.value = newPath.filePath
    message.success('路径选择成功')
  }
}
const restorePixivPathFunc = async (): Promise<void> => {
  pixivPath.value = await window.api.restorePixivPath()
  message.success('恢复默认下载路径成功')
}
</script>

<template>
  <div class="puppeteer-setting">
    <h2>puppeteer设置</h2>
    <div class="path">
      pixiv图片保存文件路径:&nbsp;&nbsp;{{ pixivPath }}
      <n-button @click="changeFilePath">修改文件路径</n-button>
      <n-button @click="restorePixivPathFunc">恢复默认路径</n-button>
    </div>
  </div>
</template>

<style scoped>
.path {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
</style>
