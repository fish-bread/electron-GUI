import runPuppeteer from '../puppeteerIpcMain/puppeteer/pixiv/pixivCore'
import puppeteerPath from '../puppeteerIpcMain/puppeteer/puppeteerpath'
import pixivPath from '../puppeteerIpcMain/puppeteer/pixiv/pixivPath'
import { ipcMain } from 'electron'
import { puppeteerPrintFunc } from '../general/allPrint'
import { pathDialog } from '../dialog/fileDialog'
import { pythonFilePath } from '../../types/mian'
import { savePathDialog } from '../dialog/fileSaveDialog'
import PixivCookie from './puppeteer/pixiv/pixivCookie'
export const registerPixivPuppeteerIpcHandlers = (): void => {
  //运行puppeteer
  ipcMain.handle('runPuppeteer', async (_event, data): Promise<void> => {
    await runPuppeteer.runPuppeteer(data)
  })
  //killPuppeteer
  ipcMain.handle('killPuppeteer', async (): Promise<void> => {
    await runPuppeteer.killPuppeteer()
  })
  //返回ChromePath
  ipcMain.handle('getChromePath', async (): Promise<string> => {
    return puppeteerPath.getPath()
  })
  //更改chromePath
  ipcMain.handle('changePuppeteer', async (): Promise<pythonFilePath> => {
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
        puppeteerPath.setLocalPath('chromePath', pathFile.filePaths[0])
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
  //还原chromePath
  ipcMain.handle('restorePuppeteerPath', async (): Promise<string> => {
    return puppeteerPath.restorePathFunc()
  })
  //获取pixiv路径
  ipcMain.handle('getPixivFilePath', async (): Promise<string> => {
    return pixivPath.getPath()
  })
  //修改pixiv路径
  ipcMain.handle('changePixivFilePath', async (): Promise<pythonFilePath> => {
    try {
      const pathFile = await savePathDialog()
      if (pathFile.filePaths[0]) {
        pixivPath.setLocalPath('pixivPath', pathFile.filePaths[0])
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
  //还原pixiv默认路径
  ipcMain.handle('restorePixivPath', async (): Promise<string> => {
    return pixivPath.restorePixivPathFunc()
  })
  //获取pixivCookie
  ipcMain.handle('getPixivCookie', async (): Promise<string> => {
    return PixivCookie.getCookies()
  })
  //修改pixivCookie
  ipcMain.handle('changePixivCookie', async (_event, cookie: string): Promise<string> => {
    return PixivCookie.setLocalCookie(cookie, 'pixivCookie')
  })
}
