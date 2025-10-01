import { getAllWindow } from '../func/windowFunc'
import { themeColor } from '../../types/mian'
import Store from 'electron-store'
const store = new Store()
class BaseTheme {
  private theme: themeColor = 'light'
  constructor() {
    this.theme = this.getLocalTheme()
  }
  //获取本地颜色
  getLocalTheme = (): themeColor => {
    const theme = store.get('theme') as themeColor
    if (theme) {
      return theme
    } else {
      return 'light'
    }
  }
  //设置本地颜色
  setLocalTheme = (theme: themeColor): void => {
    store.set('theme', theme)
    this.theme = theme
    this.settingThemeManager()
  }
  //全局设置主题色
  settingThemeManager = (): void => {
    const allWindow = getAllWindow()
    allWindow.forEach((win: Electron.BrowserWindow): void => {
      win.webContents.send('page-theme', this.theme)
    })
  }
}
export default new BaseTheme()
