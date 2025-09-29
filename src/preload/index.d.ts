import { ElectronAPI } from '@electron-toolkit/preload'
import {
  puppeteerDataInter,
  pythonFilePath,
  allMessageInter,
  allProgressInter, isGoInter
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
      pageTitleUpdated: (callback: (message: string) => void) => void
      pageReloaded: (callback: (boolean: boolean) => void) => void
      pageIsGo: (callback: (status: isGoInter) => void) => void
      goBack: () => void,
      goForward: () => void,
      reload: () => void,
      //导航栏设置
      maxSizeFunc: () => void
      minimizeFunc: () => void
      closeWindowFunc: () => void
      //获取全局设置
      getPort: () => Promise<string>
      setPort: (port: string) => void
    }
  }
}
