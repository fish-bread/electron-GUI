<script setup lang="ts">
import '@renderer/components/tool/style/tool.css'
import sharpImage from '@renderer/components/tool/sharp/sharpImage.vue'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { SharpFileInter, sharpDialogInter, showImgInter } from '../../../../../types/sharp'
const message = useMessage()

const fileData = ref<SharpFileInter[] | null>(null)
const fileImg = ref<string[]>([])
const showImgData = ref<showImgInter[] | null>(null)
const userDialog = ref<sharpDialogInter | null>(null)
//构建显示函数
const showFunc = (fileData: SharpFileInter[] | null, fileImg: string[]): showImgInter[] | null => {
  if (fileData) {
    return fileData.map((file, index) => ({
      fileData: file,
      imgPath: fileImg[index] || ''
    }))
  } else {
    return null
  }
}
//选择文件
const choose = async (): Promise<void> => {
  userDialog.value = await window.sharpApi.sharpImage()
  fileData.value = userDialog.value.fileData
  if (userDialog.value.canceled) {
    message.error('用户取消选择文件')
  } else if (!userDialog.value.canceled && userDialog.value.fileData && fileData.value) {
    fileImg.value = []
    for (let i = 0; i < userDialog.value.fileData?.length; i++) {
      fileImg.value.push(await window.api.pathToFileURL(fileData.value[i].filePath as string))
      console.log('文件路径', fileImg.value, '文件1', fileData.value[i].filePath)
    }
    //添加显示
    showImgData.value = showFunc(fileData.value, fileImg.value)
    message.success('图片选择成功')
  }
}
//修改图片
const change = async (): Promise<void> => {
  if (fileData.value) {
    const dataPath: (string | null)[] = fileData.value.map((list) => {
      return list.filePath
    })
    const success = await window.sharpApi.sharpImageChange(dataPath as string[])
    if (success.success || success.fileData) {
      fileData.value = success.fileData
      //检查是否为空
      if (!fileData.value || fileData.value.length === 0) {
        message.error('文件路径为空')
        return
      } else {
        for (let i = 0; i < fileData.value?.length; i++) {
          fileImg.value.push(await window.api.pathToFileURL(fileData.value[i].filePath as string))
          console.log('文件路径', fileImg.value, '文件1', fileData.value[i].filePath)
        }
        //添加显示
        showImgData.value = showFunc(fileData.value, fileImg.value)
        message.success('图片修改成功')
      }
    } else {
      message.error('图片修改失败')
    }
  } else {
    message.error('文件路径为空')
  }
}
const clean = (): void => {
  fileImg.value = []
  fileData.value = []
  showImgData.value = []
}
</script>

<template>
  <div class="sharp-page">
    <n-button @click="choose">按钮</n-button>
    <n-button @click="change">修改</n-button>
    <n-button @click="clean">清空</n-button>
    <div class="img-list">
      <div class="img-flex">
        <sharpImage
          v-for="(item, index) in showImgData"
          v-show="fileData !== null"
          :key="index"
          :data="item.fileData"
          :img="item.imgPath"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.img-list {
  box-sizing: border-box;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 5px;
  }
  .img-flex {
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: row;
    gap: 10px;
  }
}
</style>
