import { ipcMain } from 'electron'
import bilibiliCore from './puppeteer/bilibili/bilibiliCore'
import BilibiliCookie from './puppeteer/bilibili/bilibiliCookie'
import BilibiliPath from './puppeteer/bilibili/bilibiliPath'
import runPuppeteer from './puppeteer/pixiv/puppeteerCore'
import { puppeteerPrintFunc } from '../general/allPrint'
import { pathDialog } from '../dialog/pythonDialog'
import { pythonFilePath } from '../../types/mian'
export const registerBilibiliPuppeteerIpcHandlers = (): void => {
  //启动bilibili
  ipcMain.on('runBilibiliPuppeteer', async (_event, data): Promise<void> => {
    await bilibiliCore.runPuppeteer(data)
  })
  //KILL的BILIBILI
  ipcMain.on('killBilibiliPuppeteer', async (): Promise<void> => {
    await bilibiliCore.killPuppeteer()
  })
  //获取cookie
  ipcMain.handle('getBilibiliCookie', async (): Promise<string> => {
    return BilibiliCookie.getCookies()
  })
  //修改cookie
  ipcMain.handle('setBilibiliCookie', async (_event, cookie: string): Promise<string> => {
    return BilibiliCookie.setLocalCookie(cookie)
  })
  //获取文件path
  ipcMain.handle('getBilibiliFilePath', async (): Promise<string> => {
    return BilibiliPath.getPath()
  })
  //修改文件path
  ipcMain.handle('setBilibiliFilePath', async (): Promise<pythonFilePath> => {
    try {
      if (runPuppeteer.browser) {
        puppeteerPrintFunc('error', 'puppeteer进程正在执行')
        return {
          canceled: true,
          filePath: ''
        }
      }
      const pathFile = await pathDialog()
      if (pathFile.filePaths[0]) {
        BilibiliPath.setLocalPath('bilibiliPath', pathFile.filePaths[0])
      }
      return {
        canceled: pathFile.canceled,
        filePath: pathFile.filePaths[0]
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  })
  //还原文件path
  ipcMain.handle('restoreBilibiliFilePath', async (): Promise<string> => {
    return BilibiliPath.restoreBilibiliPathFunc()
  })
}
