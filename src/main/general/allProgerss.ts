import { allProgressInter } from '../../types/mian'
import { BrowserWindow } from 'electron'
type ChannelType = 'pythonOutProgress' | 'puppeteerOutProgress'

const createProgressSender = (channel: ChannelType) => {
  return (
    status: 'success' | 'error' | 'closed',
    message: string,
    progress: number,
    taskId: string
  ): void => {
    const allWindows = BrowserWindow.getAllWindows()
    const targetWindow = allWindows.find((win) => win.id === 1)
    const msgData: allProgressInter = {
      status: status,
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
