import { createDiscreteApi } from 'naive-ui'
import { computed } from 'vue'
import type { ConfigProviderProps } from 'naive-ui'
import { computedTheme, theme } from '@renderer/func/themeChange'
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: theme.value, //同步setup外的主题
  themeOverrides: computedTheme.value // 添加自定义主题颜色覆盖
}))
export const { message } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
  {
    configProviderProps: configProviderPropsRef
  }
)
