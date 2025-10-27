// 获取窗体
import dayjs from 'dayjs'
import { allMessageInter, allSeparatorInter } from '../../types/mian'
import { BrowserWindow } from 'electron'
type ChannelType = 'pythonOutput' | 'puppeteerOutput'
type SeparatorType = 'pythonSeparatorOutput' | 'puppeteerSeparatorOutput'
const getWindow = (): Electron.BrowserWindow | undefined => {
  const allWindows = BrowserWindow.getAllWindows()
  return allWindows.find((win) => win.id === 1)
}
//工厂打印函数
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
//创建分割线文本
const createSeparatorSender = (SeparatorType: SeparatorType) => {
  return (message: string): void => {
    const msgData: allSeparatorInter = {
      status: 'info',
      message: message
    }
    const targetWindow = getWindow()
    if (targetWindow) {
      targetWindow.webContents.send(SeparatorType, msgData)
    }
  }
}
//使用工厂函数创建专用的发送函数
export const pythonPrintFunc = createMessageSender('pythonOutput')
export const puppeteerPrintFunc = createMessageSender('puppeteerOutput')
//使用工厂函数创建专用的发送函数
export const puppeteerSeparatorPrintFunc = createSeparatorSender('puppeteerSeparatorOutput')
export const pythonSeparatorPrintFunc = createSeparatorSender('pythonSeparatorOutput')
