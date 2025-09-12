import type { pythonMessageInter, allProgressInter } from '../types/mian'
import { ipcRenderer } from 'electron'
export const outPutApi = {
  puppeteerOutput: (callback: (message: pythonMessageInter) => void): void => {
    ipcRenderer.on('puppeteerOutput', (_event, message) => callback(message))
  },
  puppeteerOutProgress: (callback: (message: allProgressInter) => void): void => {
    ipcRenderer.on('puppeteerOutProgress', (_event, message) => callback(message))
  },
  pythonOutput: (callback: (message: pythonMessageInter) => void): void => {
    ipcRenderer.on('pythonOutput', (_event, message) => callback(message))
  },
}
