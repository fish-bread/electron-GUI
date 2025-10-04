import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { computed, ref } from 'vue'
import { themeColor } from '../../../types/mian'
//主题
export const theme = ref<GlobalTheme | null>(null)
//自定义主题
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    bodyColor: '#ffffff',
    primaryColor: '#8064a9',
    primaryColorHover: '#8d74b2',
    primaryColorPressed: '#735a98',
    primaryColorSuppl: '#9983ba'
  },
  Button: {
    textColorPrimary: '#333639',
    textColorHoverPrimary: '#333639',
    textColorPressedPrimary: '#333639',
    textColorFocusPrimary: '#333639',
    textColorDisabledPrimary: '#333639'
  }
}
const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    bodyColor: '#242424',
    primaryColor: '#8064a9',
    primaryColorHover: '#8d74b2',
    primaryColorPressed: '#735a98',
    primaryColorSuppl: '#9983ba'
  },
  Button: {
    textColorPrimary: '#fff',
    textColorHoverPrimary: '#fff',
    textColorPressedPrimary: '#fff',
    textColorFocusPrimary: '#fff',
    textColorDisabledPrimary: '#fff'
  }
}
//修改主题
export const whiteTheme = async (bool: boolean): Promise<void> => {
  if (bool) {
    window.api.setTheme('dark')
  } else {
    window.api.setTheme('light')
  }
  console.log('主题查询', await window.api.getTheme())
}
//接收主进程主题的函数
export const sendTheme = (changeTheme: themeColor): void => {
  switch (changeTheme) {
    case 'dark':
      theme.value = darkTheme
      break
    case 'light':
      theme.value = null
      break
  }
}
//查询本地是否存在主题设置
export const searchLocalTheme = async (): Promise<void> => {
  const searchTheme: themeColor = await window.api.getTheme()
  console.log('主题存储', searchTheme)
  if (searchTheme === null || searchTheme === 'light') {
    theme.value = null
  }
  if (searchTheme === 'dark') {
    theme.value = darkTheme
  }
  console.log('主题色', theme.value)
}
//计算主题
export const computedTheme = computed(() => {
  return theme.value === null ? lightThemeOverrides : darkThemeOverrides
})
//返回主题色
export const computedThemeColor = computed(() => {
  return theme.value === null
    ? lightThemeOverrides?.common?.primaryColor
    : darkThemeOverrides?.common?.primaryColor
})
