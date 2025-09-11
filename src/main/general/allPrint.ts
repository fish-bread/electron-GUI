// 获取窗体
import { pythonMessageInter } from '../../types/mian'
import { BrowserWindow } from 'electron'
type ChannelType = 'pythonOutput' | 'puppeteerOutput'
// 创建一个工厂函数
const createMessageSender = (channel: ChannelType) => {
  return (status: 'success' | 'error' | 'closed', message: string): void => {
    const allWindows = BrowserWindow.getAllWindows()
    const targetWindow = allWindows.find((win) => win.id === 1)

    const msgData: pythonMessageInter = {
      status: status,
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
