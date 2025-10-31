<script setup lang="ts">
import { ref, watch } from 'vue'
import { theme } from '@renderer/func/themeChange'
const ru34Data = ref<ApiResponse | null>(null)
//请求标签
const options = ref<TabsResponse[]>([])
const tabs = ref<string>('')
//标签盒
const searchTabs = ref<Array<string>>([])
// 当前选中的标签ID（用于高亮显示）
const activeTabIds = ref<Set<string>>(new Set())
const agent = ref<boolean>(true)
import { ApiResponse, TabsResponse } from '../../../../../types/ru34'
import ru34List from '@renderer//components/tool/ru34/components/ru34List.vue'
import ru34Tabs from '@renderer//components/tool/ru34/components/ru34Tabs.vue'
watch(
  () => ru34Data.value,
  (newVal, oldVal) => {
    console.log('新值', newVal, '老值', oldVal)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="ru34-page" :data-theme="theme === null ? 'light' : 'dark'">
    <!--标签-->
    <ru34Tabs
      v-model:ru34-data="ru34Data"
      v-model:active-tab-ids="activeTabIds"
      v-model:agent="agent"
      v-model:tabs="tabs"
      v-model:search-tabs="searchTabs"
      v-model:options="options"
    />
    <!--显示盒子-->
    <ru34List :ru34-data="ru34Data" />
  </div>
</template>

<style scoped>
.ru34-page {
  box-sizing: border-box;
  padding: 0 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}
</style>
