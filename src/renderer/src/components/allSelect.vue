<script setup lang="ts">
import { ref, inject, Ref } from 'vue'
import { selectInter } from '../../../types/mian'
//注入选择
const puppeteerSelect = inject<Ref<number>>('num', ref(0))
const puppeteerOptions = inject<Ref<selectInter[]>>('options', ref([]))
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="js-select">
    <h3>{{ name }}脚本切换</h3>
    <n-select v-model:value="puppeteerSelect" :options="puppeteerOptions" />
  </div>
</template>

<style scoped>
.js-select {
  display: flex;
  flex-direction: column;
}
</style>
