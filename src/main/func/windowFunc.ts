//获取窗体
import { BrowserWindow } from 'electron'

export const getWindow = (winId: number): Electron.BrowserWindow | undefined => {
  const allWindows = BrowserWindow.getAllWindows()
  return allWindows.find((win) => win.id === winId)
}
//获取全部窗体
export const getAllWindow = (): Electron.BrowserWindow[] => {
  return BrowserWindow.getAllWindows()
}
