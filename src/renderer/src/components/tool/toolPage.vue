<script setup lang="ts">
import pageControl from '@renderer/components/pageControl.vue'
import sharpTool from '@renderer/components/tool/sharp/sharpTool.vue'
import ffmpegTool from '@renderer/components/tool/ffmpeg/ffmpegTool.vue'
import ru34Tool from '@renderer/components/tool/ru34/ru34Tool.vue'
import { pageTitleInter } from '../../../../types/renderer'
import { ref } from 'vue'
//切换页面
const tool_title = ref<pageTitleInter[]>([
  { title: 'sharp', value: 0 },
  { title: 'ffmpeg', value: 1 },
  { title: 'ru34', value: 2 }
])
const num = ref<number>(0)
</script>

<template>
  <div class="setting-page">
    <pageControl v-model:num="num" v-model:title="tool_title" />
    <sharpTool v-show="num == 0" />
    <ffmpegTool v-show="num == 1" />
    <ru34Tool v-show="num == 2" />
  </div>
</template>

<style scoped lang="scss"></style>
