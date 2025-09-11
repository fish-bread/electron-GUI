import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { computed, ref } from 'vue'
//主题
export const theme = ref<GlobalTheme | null>(null)
//自定义主题
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
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
export const whiteTheme = (bool: boolean): void => {
  if (bool) {
    localStorage.setItem('theme', 'dark')
    theme.value = darkTheme
  } else {
    localStorage.setItem('theme', 'light')
    theme.value = null
  }
  console.log('主题查询', localStorage.getItem('theme'))
}
//查询本地是否存在主题设置
export const searchLocalTheme = (): void => {
  const searchTheme: string | null = localStorage.getItem('theme')
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
