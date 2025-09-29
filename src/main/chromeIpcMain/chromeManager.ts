import { ipcMain } from 'electron'
import { createChromeWindow } from '../window/chromeWindow'
export const registerChromeIpcHandlers = (): void => {
  //创建页面
  ipcMain.on('openChromePage', (_event, href: string): void => {
    createChromeWindow(href)
  })
}
