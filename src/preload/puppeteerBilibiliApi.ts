import { ipcRenderer } from 'electron'
import { puppeteerBilibiliDataInter } from '../types/mian'
export const puppeteerBilibiliApi = {
  runBilibiliPuppeteer: (data: puppeteerBilibiliDataInter) =>
    ipcRenderer.send('runBilibiliPuppeteer', data),
  killBilibiliPuppeteer: () => ipcRenderer.send('killBilibiliPuppeteer'),
  getBilibiliCookie: () => ipcRenderer.invoke('getBilibiliCookie'),
  setBilibiliCookie: (cookie: string) => ipcRenderer.invoke('setBilibiliCookie', cookie),
  getBilibiliFilePath: () => ipcRenderer.invoke('getBilibiliFilePath'),
  setBilibiliFilePath: () => ipcRenderer.invoke('setBilibiliFilePath'),
  restoreBilibiliFilePath: () => ipcRenderer.invoke('restoreBilibiliFilePath')
}
