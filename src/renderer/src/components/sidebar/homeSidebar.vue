<script setup lang="ts">
import SidebarButton from '@renderer/components/sidebar/sidebarButton.vue'
import { theme } from '@renderer/func/themeChange'
</script>

<template>
  <div
    class="home-sidebar"
    :style="{
      borderRight: theme === null ? '1px solid #4e4e4e' : '1px solid  #2c2c2c',
      backgroundColor: theme === null ? '#ffffff' : '#2c2c2c'
    }"
  >
    <SidebarButton />
  </div>
</template>

<style scoped>
.home-sidebar {
  box-sizing: border-box;
  padding: 5px 2px 0 2px;
  width: 60px;
  height: calc(100vh - 50px);
  transition: all 0.2s ease;
}
</style>
