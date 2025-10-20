import { ElectronAPI } from '@electron-toolkit/preload'
import {
  puppeteerDataInter,
  pythonFilePath,
  allMessageInter,
  allProgressInter,
  viewInter,
  activeInter,
  themeColor
} from './mian'
import { sharpDialogInter, SharpInter } from './sharp'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      //output
      pythonOutput: (callback: (message: allMessageInter) => void) => void
      puppeteerOutput: (callback: (message: allMessageInter) => void) => void
      puppeteerOutProgress: (callback: (message: allProgressInter) => void) => void
      //导航栏设置
      maxSizeFunc: () => void
      minimizeFunc: () => void
      closeWindowFunc: () => void
      //获取全局设置
      getPort: () => Promise<string>
      setPort: (port: string) => void
      getTheme: () => Promise<themeColor>
      setTheme: (theme: themeColor) => void
      sendTheme: (callback: (theme: themeColor) => void) => void
      //puppeteer全局
      getChromePath: () => Promise<string>
      restorePuppeteerPath: () => Promise<string>
      changePuppeteer: () => Promise<pythonFilePath>
      //添加自定义文件
      pathToFileURL: (filePath: string) => Promise<string>
    }
    chromeApi: {
      //浏览器设置
      openChromePage: (href: string) => void
      pageTitleUpdated: (callback: (message: viewInter[]) => void) => void
      pageMessage: (callback: (message: activeInter) => void) => void
      pageReloaded: (callback: (boolean: boolean) => void) => void
      //页面基础操作
      goBack: (tabId: number) => void
      goForward: (tabId: number) => void
      reload: (tabId: number) => void
      pageStop: (tabId: number) => void
      //默认浏览器打开
      pageBrowser: (tabId: number) => void
      //tab页设置
      getViewTab: () => Promise<activeInter>
      changePageTab: (tabId: number) => void
      closePageTab: (tabId: number) => void
    }
    pythonApi: {
      //airtestPython
      runPython: (time: number) => void
      killPython: () => void
      getPythonPath: () => Promise<string>
      //自定义python
      runCustomPython: () => void
      killCustomPython: () => void
      choosePython: () => Promise<pythonFilePath>
      restorePythonPath: () => Promise<string>
      getCustomPythonPath: () => Promise<string>
    }
    pixivApi: {
      //PixivPuppeteer爬虫
      runPuppeteer: (data: puppeteerDataInter) => Promise<void>
      killPuppeteer: () => Promise<void>
      getPixivFilePath: () => Promise<string>
      changePixivFilePath: () => Promise<pythonFilePath>
      restorePixivPath: () => Promise<string>
      getPixivCookie: () => Promise<string>
      changePixivCookie: (cookie: string) => Promise<string>
    }
    bilibiliApi: {
      //bilibiliPuppeteer爬虫
      runBilibiliPuppeteer: (data: puppeteerDataInter) => void
      killBilibiliPuppeteer: () => void
      getBilibiliCookie: () => Promise<string>
      setBilibiliCookie: (cookie: string) => Promise<string>
      getBilibiliFilePath: () => Promise<string>
      setBilibiliFilePath: () => Promise<pythonFilePath>
      restoreBilibiliFilePath: () => Promise<string>
    }
    sharpApi: {
      sharpImage: (chooseType: string) => Promise<sharpDialogInter>
      sharpImageChange: (
        filePath: string[],
        chooseType: string,
        qualityLeave: number
      ) => Promise<SharpInter>
    }
  }
}
