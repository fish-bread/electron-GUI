<script setup lang="ts">
import toolControl from '@renderer/components/toolControl.vue'
import sharpFormat from './sharpFormat.vue'
import sharpCompress from './sharpCompress.vue'
import { pageTitleInter } from '../../../../../types/renderer'
import { ref } from 'vue'
//切换页面
const setting_title = ref<pageTitleInter[]>([
  { title: '图片转化', value: 0 },
  { title: '图片压缩', value: 1 },
])
const num = ref<number>(0)
</script>

<template>
  <div class="sharp">
    <toolControl v-model:num="num" v-model:title="setting_title" />
    <sharpFormat v-show="num === 0" />
    <sharpCompress v-show="num === 1" />
  </div>
</template>

<style scoped lang="scss">
.sharp {
  width: 100%;
  overflow: hidden;
}
</style>
