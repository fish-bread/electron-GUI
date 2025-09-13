import { ipcMain } from 'electron'
import baseAxios from '../general/BaseAxios'
export const allSettingManager = (): void => {
  //获取全局代理端口号
  ipcMain.handle('getPort', (): string => {
    return baseAxios.getPort()
  })
  //修改全局端口
  ipcMain.on('setPort', (_event, port: string): void => {
    baseAxios.setLocalPort('basePort', port)
  })
}
