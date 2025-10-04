<script setup lang="ts">
import HeaderChromeIndex from '@renderer/components/chrome/headerChromeIndex.vue'
import { onBeforeMount } from 'vue'
import { sendTheme } from '@renderer/func/themeChange'
onBeforeMount(() => {
  window.api.sendTheme(sendTheme)
})
</script>

<template>
  <HeaderChromeIndex />
</template>

<style scoped></style>
