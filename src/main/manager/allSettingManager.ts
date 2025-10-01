import { ipcMain } from 'electron'
import baseAxios from '../general/BaseAxios'
import { themeColor } from '../../types/mian'
import BaseTheme from '../general/allTheme'
//全局设置
export const allSettingManager = (): void => {
  //获取全局代理端口号
  ipcMain.handle('getPort', (): string => {
    return baseAxios.getPort()
  })
  //修改全局端口
  ipcMain.on('setPort', (_event, port: string): void => {
    baseAxios.setLocalPort('basePort', port)
  })
  //获取全局颜色并返回
  ipcMain.handle('getTheme', (): themeColor => {
    return BaseTheme.getLocalTheme()
  })
  //修改全局颜色并广播全部窗体
  ipcMain.on('setTheme', (_event, theme: themeColor): void => {
    BaseTheme.setLocalTheme(theme)
  })
}
