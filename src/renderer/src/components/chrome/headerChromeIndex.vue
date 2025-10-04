<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { theme } from '@renderer/func/themeChange'
import ChromeWindowControl from './chromeWindowControl.vue'
import ChevronRight20Regular from '@vicons/fluent/ChevronRight20Regular'
import ChevronLeft20Regular from '@vicons/fluent/ChevronLeft20Regular'
import ArrowSync20Regular from '@vicons/fluent/ArrowSync20Regular'
import { activeInter, viewInter } from '../../../../types/mian'
import Dismiss20Regular from '@vicons/fluent/Dismiss20Regular'
import Add20Regular from '@vicons/fluent/Add20Regular'
import { VueDraggable } from 'vue-draggable-plus'
const PageMessage = ref<viewInter[]>([])
const reloadRef = ref<HTMLButtonElement | null>(null)
const isGoBack = ref<boolean>(true)
const isGoForward = ref<boolean>(true)
const isReload = ref<boolean>(true)
//tab标签
const activeTabId = ref<number>(0) // 当前活动标签页的 ID
const updateTitle = (message: viewInter[]): void => {
  PageMessage.value = message
  console.log('标题', message)
}
const updateTabs = (message: activeInter): void => {
  PageMessage.value = message.viewMessage
  activeTabId.value = message.activeId
  console.log('消息', message)
}
watch(
  activeTabId,
  (newVal) => {
    console.log('当前活动id', newVal)
    const currentTab = PageMessage.value.find((tab: viewInter) => tab.id === newVal)
    console.log('我为什么1', currentTab)
    if (currentTab) {
      isGoBack.value = !currentTab.isGoBack
      isGoForward.value = !currentTab.isGoForward
    } else {
      // 如果没有找到对应的标签页，禁用导航按钮
      isGoBack.value = true
      isGoForward.value = true
    }
  },
  {
    immediate: false,
    deep: true
  }
)
watch(
  PageMessage,
  () => {
    console.log('当前活动id', activeTabId.value)
    const currentTab = PageMessage.value.find((tab: viewInter) => tab.id === activeTabId.value)
    console.log('我为什么2', currentTab)
    if (currentTab) {
      isGoBack.value = !currentTab.isGoBack
      isGoForward.value = !currentTab.isGoForward
    } else {
      // 如果没有找到对应的标签页，禁用导航按钮
      isGoBack.value = true
      isGoForward.value = true
    }
  },
  {
    immediate: false,
    deep: true
  }
)
const goback = (): void => {
  window.api.goBack(activeTabId.value)
}
const goForward = (): void => {
  window.api.goForward(activeTabId.value)
}
const reload = (): void => {
  window.api.reload(activeTabId.value)
}
const stop = (): void => {
  window.api.pageStop(activeTabId.value)
}

const animePageButton = (boolean: boolean): void => {
  isReload.value = boolean
}
// 切换标签页的方法
const switchTab = (tabId: number): void => {
  activeTabId.value = tabId
  window.api.changePageTab(tabId)
}
// 关闭标签页的方法
const closeTab = (tabId: number): void => {
  window.api.closePageTab(tabId)
}
//打开bing页面
const openBing = (): void => {
  window.api.openChromePage('https://cn.bing.com/?mkt=zh-CN')
}
onMounted(async () => {
  //初始化页面
  const message = await window.api.getViewTab()
  PageMessage.value = message.viewMessage
  activeTabId.value = message.activeId
  //更新页面
  window.api.pageTitleUpdated(updateTitle)
  window.api.pageReloaded(animePageButton)
  //获取消息
  window.api.pageMessage(updateTabs)
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
    :data-theme="theme === null ? 'light' : 'dark'"
  >
    <div class="head-left">
      <button
        :disabled="isGoBack"
        class="control-button"
        :class="{
          cursorPointer: isGoBack === false
        }"
        :title="isGoBack === false ? '上一页' : ''"
        @click="goback"
      >
        <n-icon :size="20">
          <ChevronLeft20Regular />
        </n-icon>
      </button>
      <button
        :disabled="isGoForward"
        class="control-button"
        :class="{
          cursorPointer: isGoForward === false
        }"
        :title="isGoForward === false ? '下一页' : ''"
        @click="goForward"
      >
        <n-icon :size="20">
          <ChevronRight20Regular />
        </n-icon>
      </button>
      <div>
        <div
          v-show="isReload"
          ref="reloadRef"
          class="control-button cursorPointer"
          title="刷新页面"
          @click="reload"
        >
          <n-icon :size="20">
            <ArrowSync20Regular />
          </n-icon>
        </div>
        <button
          v-show="!isReload"
          ref="stopRef"
          class="control-button cursorPointer"
          title="取消加载页面"
          @click="stop"
        >
          <n-icon :size="20">
            <Dismiss20Regular />
          </n-icon>
        </button>
      </div>
    </div>
    <div class="center app-drag">
      <!--标签页-->
      <VueDraggable
        v-model="PageMessage"
        class="head-center"
        style="user-select: none"
        :animation="150"
      >
        <div
          v-for="item in PageMessage"
          :key="item.id"
          class="head-center-tab app-drag-disable"
          :class="{ active: activeTabId === item.id }"
          :title="item.title"
          @click="switchTab(item.id)"
        >
          <div style="max-width: 150px; overflow: hidden; text-overflow: ellipsis">
            {{ item.title }}
          </div>
          <!--icon-->
          <div
            class="title-button cursorPointer"
            title="关闭标签页"
            @click.stop="closeTab(item.id)"
          >
            <n-icon :size="15">
              <Dismiss20Regular />
            </n-icon>
          </div>
        </div>
      </VueDraggable>
      <!--添加新页面-->
      <div class="newPage-button app-drag-disable" title="添加新页面" @click="openBing">
        <n-icon size="26">
          <Add20Regular />
        </n-icon>
      </div>
    </div>
    <!--控制栏-->
    <ChromeWindowControl v-model="PageMessage" icon-size="20" :active-id="activeTabId" />
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
      color: var(--button-disabled-color);
      &:hover {
        background-color: var(--button-hover-color);
      }
      &:disabled {
        color: #888888;
      }
      &:disabled:hover {
        background-color: transparent;
      }
    }
  }
  .center {
    @extend %head-box-display-row;
    transition: all 0.2s ease;
    overflow: hidden;
    flex: 1;
    gap: 5px;
    align-items: center;
    .head-center {
      @extend %head-box-display-row;
      padding: 0 0 0 5px;
      gap: 5px;
      transition: all 0.2s ease;
      overflow: hidden;
      .head-center-tab {
        @extend %head-box-display-row;
        overflow: hidden;
        gap: 5px;
        padding: 3px 5px 3px 20px;
        border-radius: 3px;
        background-color: var(--tab-color);
        max-width: 150px;
        white-space: nowrap;
        text-overflow: ellipsis;
        align-items: center;
        font-size: 11px;
        transition: all 0.2s ease;
        &.active {
          background-color: var(--tab-active-color);
        }
        &:not(.active):hover {
          background-color: var(--tab-not-active-color);
        }
      }
      .title-button {
        box-sizing: border-box;
        outline: unset;
        border: none;
        background: none;
        transition: all 0.2s ease;
        border-radius: 5px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: var(--button-hover-color);
        }
      }
    }
    .newPage-button {
      width: 26px;
      height: 26px;
      box-sizing: border-box;
      transition: all 0.2s ease;
      display: flex;
      border-radius: 3px;
      &:hover {
        background-color: var(--button-hover-color);
      }
    }
  }
}
</style>
