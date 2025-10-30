import { allProgressInter } from '../../types/mian'
type ChannelType = 'puppeteerOutProgress' | 'pythonOutProgress'
import { getWindow } from '../func/windowFunc'
const createProgressSender = (channel: ChannelType) => {
  return (
    status: 'info' | 'error' | 'closed',
    dataTime: string,
    message: string,
    progress: number,
    taskId: string
  ): void => {
    const targetWindow = getWindow(1)
    const msgData: allProgressInter = {
      status: status,
      dataTime: dataTime,
      message: message,
      progress: progress,
      taskId: taskId
    }

    if (targetWindow) {
      targetWindow.webContents.send(channel, msgData)
    }
  }
}
export const puppeteerProgressFunc = createProgressSender('puppeteerOutProgress')
export const pythonProgressFunc = createProgressSender('pythonOutProgress')
