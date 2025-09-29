// 获取窗体
import dayjs from 'dayjs'
import { allMessageInter } from '../../types/mian'
import { BrowserWindow } from 'electron'
type ChannelType = 'pythonOutput' | 'puppeteerOutput'
const getWindow = (): Electron.BrowserWindow | undefined => {
  const allWindows = BrowserWindow.getAllWindows()
  return allWindows.find((win) => win.id === 1)
}
// 创建一个工厂函数
const createMessageSender = (channel: ChannelType) => {
  return (status: 'info' | 'warning' | 'error' | 'closed', message: string): void => {
    const targetWindow = getWindow()

    const msgData: allMessageInter = {
      status: status,
      dataTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
      message: message
    }

    if (targetWindow) {
      targetWindow.webContents.send(channel, msgData)
    }
  }
}

// 使用工厂函数创建专用的发送函数
export const pythonPrintFunc = createMessageSender('pythonOutput')
export const puppeteerPrintFunc = createMessageSender('puppeteerOutput')
