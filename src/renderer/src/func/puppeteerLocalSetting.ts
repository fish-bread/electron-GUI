import { Ref, ref } from 'vue'
import { message } from '@renderer/func/messageApi'
export interface PuppeteerSettingsApi {
  changeFilePath: () => Promise<{ canceled: boolean; filePath: string }>
  restorePath: () => Promise<string>
  changeCookie: (newCookie: string) => Promise<string>
}
class puppeteerLocalSettings {
  public changeCookie: Ref<string> = ref('')
  constructor(
    private api: PuppeteerSettingsApi,
    private filePath: Ref<string>,
    private cookie: Ref<string>
  ) {}
  changeFilePathFunc = async (): Promise<void> => {
    const newPath = await this.api.changeFilePath()
    if (newPath.canceled) {
      message.error('未选择文件保存路径')
    } else {
      console.log('文件路径', newPath)
      this.filePath.value = newPath.filePath
      message.success('路径选择成功')
    }
  }
  restoreFilePathFunc = async (): Promise<void> => {
    this.filePath.value = await this.api.restorePath()
    message.success('恢复默认下载路径成功')
  }
  changeCookieFunc = async (): Promise<void> => {
    this.cookie.value = await this.api.changeCookie(this.changeCookie.value)
    message.success('修改Cookie成功')
  }
}
export default puppeteerLocalSettings
