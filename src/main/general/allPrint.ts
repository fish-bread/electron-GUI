// 获取窗体
import dayjs from 'dayjs'
import { allMessageInter, allSeparatorInter } from '../../types/mian'
import { getWindow } from '../func/windowFunc'
type ChannelType = 'pythonOutput' | 'puppeteerOutput'
type SeparatorType = 'pythonSeparatorOutput' | 'puppeteerSeparatorOutput'

//工厂打印函数
const createMessageSender = (channel: ChannelType) => {
  return (status: 'info' | 'warning' | 'error' | 'closed', message: string): void => {
    const targetWindow = getWindow(1)

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
    const targetWindow = getWindow(1)
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
