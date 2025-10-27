import type { allMessageInter, allProgressInter, allSeparatorInter } from '../types/mian'
import { ipcRenderer } from 'electron'
export const outPutApi = {
  puppeteerOutput: (callback: (message: allMessageInter) => void): void => {
    ipcRenderer.on('puppeteerOutput', (_event, message) => callback(message))
  },
  puppeteerOutProgress: (callback: (message: allProgressInter) => void): void => {
    ipcRenderer.on('puppeteerOutProgress', (_event, message) => callback(message))
  },
  pythonOutput: (callback: (message: allMessageInter) => void): void => {
    ipcRenderer.on('pythonOutput', (_event, message) => callback(message))
  },
  puppeteerSeparatorOutput: (callback: (message: allSeparatorInter) => void): void => {
    ipcRenderer.on('puppeteerSeparatorOutput', (_event, message) => callback(message))
  },
  pythonSeparatorOutput: (callback: (message: allSeparatorInter) => void): void => {
    ipcRenderer.on('pythonSeparatorOutput', (_event, message) => callback(message))
  }
}
