<script setup lang="ts">
import { inject, Ref, ref } from 'vue'
import { useMessage } from 'naive-ui'
const pixivPath = inject<Ref<string>>('filePath', ref(''))
const pixivCookie = inject<Ref<string>>('pixivCookie', ref(''))
const changeCookie = ref<string>('')
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
const changeCookieFunc = async (): Promise<void> => {
  pixivCookie.value = await window.api.changePixivCookie(changeCookie.value)
}
</script>

<template>
  <div class="puppeteer-setting">
    <h2>puppeteer设置</h2>
    <div class="pixiv-cookie">
      <n-tooltip :show-arrow="false" trigger="hover">
        <template #trigger>
          <div class="pixiv-cookie-view">pixiv的cookie:&nbsp;&nbsp;{{ pixivCookie }}</div>
        </template>
        {{ pixivCookie }}
      </n-tooltip>
      <n-input v-model:value="changeCookie" />
      <n-button @click="changeCookieFunc">更换cookie</n-button>
    </div>
    <div class="path">
      pixiv图片保存文件路径:&nbsp;&nbsp;{{ pixivPath }}
      <n-button @click="changeFilePath">修改文件路径</n-button>
      <n-button @click="restorePixivPathFunc">恢复默认路径</n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.path {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
.pixiv-cookie {
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  overflow: hidden;
  white-space: nowrap;
  .pixiv-cookie-view {
    max-width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
