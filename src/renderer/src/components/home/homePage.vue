<script setup lang="ts">
import { ref } from 'vue'
import FooterIndex from '@renderer/components/footerIndex.vue'
import { formatMessageWithLinks } from '@renderer/func/linkTextFunc'
// 假设这是你的原始文本内容
const originalText = ref('欢迎访问我的博客网站 https://fishbread.net/ ')
</script>

<template>
  <div class="home-page">
    <div class="home-text">
      <h1>electron-GUI</h1>
      <h2>这是试图用electron制作pythonGUI和jsGUI的项目</h2>
      <h3>如果你不在乎性能可以尝试一下,基于electron-vite + python-shell + puppeteer</h3>
      <h3>
        目前的功能有根据pid爬取pixiv图片,根据bv号爬取bilibili视频,能够较好的实现使用electron窗体查看外部链接
      </h3>
      <div v-dompurify-html="formatMessageWithLinks(originalText)"></div>
      <h3>第一次使用请先到设置中设置</h3>
      <FooterIndex />
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
