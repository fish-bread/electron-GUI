<script setup lang="ts">
import { inject, Ref } from 'vue'
import { allMessageInter } from '../../../../types/mian'
const mess = inject<Ref<allMessageInter[]>>('mess')
const clean_python = (): void => {
  if (mess) mess.value = []
}
</script>

<template>
  <div>
    <h3>python控制台</h3>
    <n-button @click="clean_python">清除打印台</n-button>
  </div>
</template>

<style scoped>

</style>
