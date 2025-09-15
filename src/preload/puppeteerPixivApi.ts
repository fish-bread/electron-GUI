import { ipcRenderer } from 'electron'
import { puppeteerDataInter } from '../types/mian'
export const PuppeteerPixivApi = {
  runPuppeteer: (data: puppeteerDataInter) => ipcRenderer.invoke('runPuppeteer', data),
  killPuppeteer: () => ipcRenderer.invoke('killPuppeteer'),
  getChromePath: () => ipcRenderer.invoke('getChromePath'),
  changePuppeteer: () => ipcRenderer.invoke('changePuppeteer'),
  restorePuppeteerPath: () => ipcRenderer.invoke('restorePuppeteerPath'),
  getPixivFilePath: () => ipcRenderer.invoke('getPixivFilePath'),
  changePixivFilePath: () => ipcRenderer.invoke('changePixivFilePath'),
  restorePixivPath: () => ipcRenderer.invoke('restorePixivPath'),
  getPixivCookie: () => ipcRenderer.invoke('getPixivCookie'),
  changePixivCookie: (cookieData: string) => ipcRenderer.invoke('changePixivCookie', cookieData)
}
