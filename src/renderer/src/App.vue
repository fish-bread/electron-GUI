<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
import { theme, computedTheme, searchLocalTheme } from '@renderer/func/themeChange'
import { onBeforeMount } from 'vue'
import { computedThemeColor } from '@renderer/func/themeChange'
onBeforeMount(() => {
  searchLocalTheme()
})
</script>

<template>
  <!--naive主题-->
  <n-config-provider
    :theme="theme"
    :theme-overrides="computedTheme"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <!--消息提示-->
    <n-message-provider>
      <!--返回顶部-->
      <n-back-top :right="30" :bottom="30" />
      <router-view></router-view>
      <!--同步颜色-->
      <n-global-style />
    </n-message-provider>
  </n-config-provider>
</template>
<style lang="scss">
a {
  color: v-bind(computedThemeColor);
}
</style>
