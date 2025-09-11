import { ipcRenderer } from 'electron'
import { puppeteerDataInter, pythonMessageInter } from '../types/mian'
export const PuppeteerApi = {
  runPuppeteer: (data: puppeteerDataInter) => ipcRenderer.invoke('runPuppeteer', data),
  killPuppeteer: () => ipcRenderer.invoke('killPuppeteer'),
  puppeteerOutput: (callback: (message: pythonMessageInter) => void): void => {
    ipcRenderer.on('puppeteerOutput', (_event, message) => callback(message))
  },
  getChromePath: () => ipcRenderer.invoke('getChromePath'),
  changePuppeteer: () => ipcRenderer.invoke('changePuppeteer'),
  restorePuppeteerPath: () => ipcRenderer.invoke('restorePuppeteerPath'),
  getPixivFilePath: () => ipcRenderer.invoke('getPixivFilePath'),
  changePixivFilePath: () => ipcRenderer.invoke('changePixivFilePath'),
  restorePixivPath: () => ipcRenderer.invoke('restorePixivPath'),
}
