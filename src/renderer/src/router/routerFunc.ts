import { type FunctionArgs, useDebounceFn, type UseDebounceFnReturn } from '@vueuse/core'
import router from '@renderer/router/index'
//通用内部导航
export const routerFunc: UseDebounceFnReturn<FunctionArgs> = useDebounceFn(
  async (path: string): Promise<void> => {
    try {
      await router.push(path)
    } catch (error) {
      console.log(error)
  }
  },
  500
)
//通用新标签页外部导航
export const routerOpen = (path: string): void => {
  window.open(path, '_blank')
}
