<script setup lang="ts">
import { inject, Ref } from 'vue'
const python_file = inject<Ref<string>>('all_file')
const pathName = inject<string>('pathName')
</script>

<template>
  <n-tooltip :show-arrow="false" trigger="hover">
    <template #trigger>
      <div class="file-path">&nbsp;{{ pathName }}启动路径:&nbsp;{{ python_file }}</div>
    </template>
    {{ python_file }}
  </n-tooltip>
</template>

<style scoped>
.file-path {
  height: 23px;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
}
</style>
