import { ElectronAPI } from '@electron-toolkit/preload'
import {
  puppeteerDataInter,
  pythonFilePath,
  allMessageInter,
  allProgressInter, isGoInter, viewInter, activeInter, themeColor
} from '../types/mian'
import {ipcRenderer} from "electron";
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      //airtestPython
      runPython: (time: number) => void
      killPython: () => void
      pythonOutput: (callback: (message: allMessageInter) => void) => void
      getPythonPath: () => Promise<string>
      //自定义python
      runCustomPython: () => void
      killCustomPython: () => void
      choosePython: () => Promise<pythonFilePath>
      restorePythonPath: () => Promise<string>
      getCustomPythonPath: () => Promise<string>
      //PixivPuppeteer爬虫
      runPuppeteer: (data: puppeteerDataInter) => Promise<void>
      killPuppeteer: () => Promise<void>
      puppeteerOutput: (callback: (message: allMessageInter) => void) => void
      puppeteerOutProgress: (callback: (message: allProgressInter) => void) => void
      getChromePath: () => Promise<string>
      changePuppeteer: () => Promise<pythonFilePath>
      restorePuppeteerPath: () => Promise<string>
      getPixivFilePath: () => Promise<string>
      changePixivFilePath: () => Promise<pythonFilePath>
      restorePixivPath: () => Promise<string>
      getPixivCookie: () => Promise<string>
      changePixivCookie: (cookieData: string) => Promise<string>
      //bilibiliPuppeteer爬虫
      runBilibiliPuppeteer: (data: puppeteerDataInter) => void
      killBilibiliPuppeteer: () => void
      getBilibiliCookie: () => Promise<string>
      setBilibiliCookie: (cookie: string) => Promise<string>
      getBilibiliFilePath: () => Promise<string>
      setBilibiliFilePath: () => Promise<pythonFilePath>
      restoreBilibiliFilePath: () => Promise<string>
      //浏览器设置
      openChromePage: (href: string) => void
      pageTitleUpdated: (callback: (message: viewInter[]) => void) => void
      pageMessage: (callback: (message: activeInter) => void) => void
      pageReloaded: (callback: (boolean: boolean) => void) => void
      //页面基础操作
      goBack: (tabId: number) => void,
      goForward: (tabId: number) => void,
      reload: (tabId: number) => void,
      pageStop: (tabId: number) => void,
      //默认浏览器打开
      pageBrowser: (tabId: number) => void,
      //tab页设置
      getViewTab: () => Promise<activeInter>
      changePageTab: (tabId: number) => void,
      closePageTab: (tabId: number) => void,
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
    }
  }
}
