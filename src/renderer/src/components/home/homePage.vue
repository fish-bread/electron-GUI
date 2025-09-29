<script setup lang="ts">
import { ref } from 'vue'
const href = ref<string>('')
const open = (): void => {
  window.api.openChromePage(href.value)
}
</script>

<template>
  <div class="home-page">
    <div class="home-text">
      <h1>electron-python</h1>
      <h2>这是试图用electron制作pythonGUI的项目</h2>
      <h3>如果你不在乎性能可以尝试一下,基于electron-vite + python-shell</h3>
      <button @click="open">点击</button>
      <n-input v-model:value="href" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  flex: 1;
  display: flex;
  justify-content: center;
  .home-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
