<script setup lang="ts">
import { ref } from 'vue'
import '@renderer/components/tool/sharp/style/tool.css'
import sharpImage from '@renderer/components/tool/sharp/sharpImage.vue'
import sharpProgress from './sharpProgress.vue'
import { useSharp } from '@renderer/components/tool/sharp/func/sharpFunc'

const { choose, showImgData, fileData, change, clean } = useSharp()
const qualityLeave = ref<number>(100)
</script>

<template>
  <div class="sharp-page">
    <div>图片将输出到原图片下output文件</div>
    <sharpProgress :quality-leave="qualityLeave" />
    <div style="display: flex; flex-direction: row; gap: 10px">
      <n-button @click="choose('all')">选择图片</n-button>
      <n-button @click="change('all', qualityLeave)">压缩图片</n-button>
      <n-button @click="clean">清空图片</n-button>
    </div>
    <div class="img-list">
      <div class="img-flex">
        <sharpImage
          v-for="(item, index) in showImgData"
          v-show="fileData !== null"
          :key="index"
          :state="item.success"
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
  width: 70%;
  height: 430px;
  overflow-x: auto;
  overflow-y: auto;
  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }
  .img-flex {
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
