import { ipcRenderer } from 'electron'

export const globalPuppeteerApi = {
  getChromePath: () => ipcRenderer.invoke('getChromePath'),
  changePuppeteer: () => ipcRenderer.invoke('changePuppeteer'),
  restorePuppeteerPath: () => ipcRenderer.invoke('restorePuppeteerPath')
}
