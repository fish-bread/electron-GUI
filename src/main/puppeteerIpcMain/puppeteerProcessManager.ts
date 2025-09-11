import runPuppeteer from '../puppeteerIpcMain/puppeteer/puppeteerCore'
import puppeteerPath from '../puppeteerIpcMain/puppeteer/puppeteerpath'
import pixivPath from '../puppeteerIpcMain/puppeteer/pixivPath'
import { ipcMain } from 'electron'
import { puppeteerPrintFunc } from '../general/allPrint'
import { pathDialog } from '../dialog/pythonDialog'
import { pythonFilePath } from '../../types/mian'
import { savePathDialog } from '../dialog/fileSaveDialog'
export const registerPuppeteerIpcHandlers = (): void => {
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
        puppeteerPath.changePath(pathFile.filePaths[0])
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
        pixivPath.changePath(pathFile.filePaths[0])
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
}
