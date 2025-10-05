<script setup lang="ts">
import { inject, Ref } from 'vue'
import { allMessageInter } from '../../../../types/mian'
import { useMessage } from 'naive-ui'
const message = useMessage()
const mess = inject<Ref<allMessageInter[]>>('mess')
const clean_python = (): void => {
  if (mess) {
    mess.value = []
    message.success('python控制台已清空')
  }
}
</script>

<template>
  <div class="setting-container">
    <h3>python控制台</h3>
    <n-button @click="clean_python">清除打印台</n-button>
  </div>
</template>

<style scoped>

</style>
