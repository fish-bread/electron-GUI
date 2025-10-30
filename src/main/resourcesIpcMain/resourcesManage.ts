import { ipcMain } from 'electron'
import { createResourcesWindow } from '../window/resourcesWindow'
import { sendPost } from '../../types/ru34'
export const registerResourcesIpcHandlers = (): void => {
  //打开资源页面
  ipcMain.on('show-resources', (_event, filePath: sendPost): void => {
    createResourcesWindow(filePath)
  })
}
