<script setup lang="ts">
import sharpControl from '@renderer/components/sharpControl.vue'
import sharpFormatConversion from './sharpFormatConversion.vue'
import { pageTitleInter } from '../../../../../types/renderer'
import { ref } from 'vue'
//切换页面
const setting_title = ref<pageTitleInter[]>([
  { title: '图片转化', value: 0 },
  { title: 'python设置', value: 1 },
  { title: 'pixiv设置', value: 2 },
  { title: 'bilibili设置', value: 3 }
])
const num = ref<number>(0)
</script>

<template>
  <div class="sharp">
    <sharpControl v-model:num="num" v-model:title="setting_title" />
    <sharpFormatConversion v-show="num === 0" />
  </div>
</template>

<style scoped lang="scss">
.sharp {
  width: 100%;
  overflow: hidden;
}
</style>
