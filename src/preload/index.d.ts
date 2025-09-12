import { ElectronAPI } from '@electron-toolkit/preload'
import {
  puppeteerDataInter,
  pythonFilePath,
  pythonMessageInter,
  allProgressInter
} from '../types/mian'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      runPython: (time: number) => Promise<void>
      killPython: () => Promise<void>
      pythonOutput: (callback: (message: pythonMessageInter) => void) => void
      choosePython: () => Promise<pythonFilePath>
      restorePythonPath: () => Promise<string>
      getPythonPath: () => Promise<string>
      runPuppeteer: (data: puppeteerDataInter) => Promise<void>
      killPuppeteer: () => Promise<void>
      puppeteerOutput: (callback: (message: pythonMessageInter) => void) => void
      puppeteerOutProgress: (callback: (message: allProgressInter) => void) => void
      getChromePath: () => Promise<string>
      changePuppeteer: () => Promise<pythonFilePath>
      restorePuppeteerPath: () => Promise<string>
      getPixivFilePath: () => Promise<string>
      changePixivFilePath: () => Promise<pythonFilePath>
      restorePixivPath: () => Promise<string>
      getPixivCookie: () => Promise<string>
      changePixivCookie: (cookieData: string) => Promise<string>
      maxSizeFunc: () => void
      minimizeFunc: () => void
      closeWindowFunc: () => void
    }
  }
}
