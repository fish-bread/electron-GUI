import { ipcRenderer } from 'electron'
import { puppeteerDataInter, pythonMessageInter, allProgressInter } from '../types/mian'
export const PuppeteerApi = {
  runPuppeteer: (data: puppeteerDataInter) => ipcRenderer.invoke('runPuppeteer', data),
  killPuppeteer: () => ipcRenderer.invoke('killPuppeteer'),
  puppeteerOutput: (callback: (message: pythonMessageInter) => void): void => {
    ipcRenderer.on('puppeteerOutput', (_event, message) => callback(message))
  },
  puppeteerOutProgress: (callback: (message: allProgressInter) => void): void => {
    ipcRenderer.on('puppeteerOutProgress', (_event, message) => callback(message))
  },
  getChromePath: () => ipcRenderer.invoke('getChromePath'),
  changePuppeteer: () => ipcRenderer.invoke('changePuppeteer'),
  restorePuppeteerPath: () => ipcRenderer.invoke('restorePuppeteerPath'),
  getPixivFilePath: () => ipcRenderer.invoke('getPixivFilePath'),
  changePixivFilePath: () => ipcRenderer.invoke('changePixivFilePath'),
  restorePixivPath: () => ipcRenderer.invoke('restorePixivPath'),
  getPixivCookie: () => ipcRenderer.invoke('getPixivCookie'),
  changePixivCookie: (cookieData: string) => ipcRenderer.invoke('changePixivCookie', cookieData)
}
