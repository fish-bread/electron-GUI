<script setup lang="ts">
import '@renderer/components/tool/style/tool.css'
import sharpImage from '@renderer/components/tool/sharp/sharpImage.vue'
import { ref } from 'vue'
import { useSharp } from '@renderer/components/tool/sharp/func/sharpFunc'
const { choose, showImgData, fileData, primitiveType, changeType, change, clean } = useSharp()
//选择转化
const imgTypeList = ref([
  {
    label: 'png图片',
    value: 'png'
  },
  {
    label: 'jpg图片',
    value: 'jpg'
  }
])
</script>

<template>
  <div class="sharp-page">
    <div>图片将输出到原图片下output文件</div>
    <div style="display: flex; flex-direction: row; gap: 10px">
      <div>
        <div>要转化的图片类型</div>
        <n-select v-model:value="primitiveType" :options="imgTypeList" />
      </div>
      <div>
        <div>转化后的图片类型</div>
        <n-select v-model:value="changeType" :options="imgTypeList" />
      </div>
    </div>
    <div style="display: flex; flex-direction: row; gap: 10px">
      <n-button @click="choose(primitiveType)">选择图片</n-button>
      <n-button @click="change(changeType, 100)">修改图片</n-button>
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
  width: 80%;
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
