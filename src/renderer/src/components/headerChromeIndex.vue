<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { theme } from '@renderer/func/themeChange'
import ChromeWindowControl from '@renderer/components/chromeWindowControl.vue'
import ChevronRight20Regular from '@vicons/fluent/ChevronRight20Regular'
import ChevronLeft20Regular from '@vicons/fluent/ChevronLeft20Regular'
import ArrowSync20Regular from '@vicons/fluent/ArrowSync20Regular'
import { animate } from 'animejs'
import { isGoInter } from '../../../types/mian'
const title = ref<string>('')
const reloadRef = ref<HTMLButtonElement | null>(null)
const isGoBack = ref<boolean>(true)
const isGoForward = ref<boolean>(true)
const updateTitle = (message: string): void => {
  title.value = message
}
const goback = (): void => {
  window.api.goBack()
}
const goForward = (): void => {
  window.api.goForward()
}
const reload = (): void => {
  window.api.reload()
}
//确认是否可以返回或前进
const isGoFunc = async (status: isGoInter): Promise<void> => {
  isGoBack.value = status.isGOBack === false ? true : false;
  isGoForward.value = status.isGoForward === false ? true : false
}
onMounted(() => {
  //动画
  const reloadButtonAnim = animate(reloadRef.value as HTMLButtonElement, {
    rotate: { to: [0, 360 * 100] },
    duration: 2000 * 100,
    easing: 'ease',
    loop: true,
    autoplay: false
  })
  const anime = (boolean: boolean): void => {
    if (boolean) {
      console.log('暂停')
      reloadButtonAnim.revert()
    } else {
      console.log('开始')
      reloadButtonAnim.play()
    }
  }
  window.api.pageTitleUpdated(updateTitle)
  window.api.pageReloaded(anime)
  window.api.pageIsGo(isGoFunc)
})
</script>

<template>
  <div
    class="header"
    :style="{
      backgroundColor: theme === null ? '#ffffff' : '#2c2c2c',
      boxShadow:
        theme === null ? '0 0 5px 1px rgba(0, 0, 0, 0.3)' : '0 0 5px 1px rgba(50, 50, 50, 0.3)'
    }"
  >
    <div class="head-left">
      <button
        :disabled="isGoBack"
        class="control-button cursorPointer"
        title="上一页"
        @click="goback"
      >
        <n-icon :size="20">
          <ChevronLeft20Regular />
        </n-icon>
      </button>
      <button
        :disabled="isGoForward"
        class="control-button cursorPointer"
        title="下一页"
        @click="goForward"
      >
        <n-icon :size="20">
          <ChevronRight20Regular />
        </n-icon>
      </button>
      <button ref="reloadRef" class="control-button cursorPointer" title="刷新页面" @click="reload">
        <n-icon :size="20">
          <ArrowSync20Regular />
        </n-icon>
      </button>
    </div>
    <div class="head-center app-drag" style="flex: 1; user-select: none">{{ title }}</div>
    <!--控制栏-->
    <ChromeWindowControl icon-size="20" />
  </div>
</template>

<style scoped lang="scss">
%head-box-display-row {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}
.header {
  @extend %head-box-display-row;
  height: 40px;
  padding: 0 0 0 5px;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  .head-left {
    @extend %head-box-display-row;
    height: 100%;
    gap: 5px;
    align-items: center;
    .control-button {
      outline: unset;
      border: none;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 30px;
      transition: all 0.2s ease;
      border-radius: 50%;
      &:hover {
        background-color: #ededed;
      }
      &:disabled {
        color: #d7d3d3;
      }
      &:disabled:hover {
        background-color: transparent;
      }
    }
  }
  .head-center {
    @extend %head-box-display-row;
    padding: 0 0 0 5px;
  }
}
</style>
