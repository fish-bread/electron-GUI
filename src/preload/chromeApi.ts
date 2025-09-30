import { ipcRenderer } from 'electron'
import { activeInter, viewInter } from '../types/mian'
export const chromeApi = {
  openChromePage: (href: string) => ipcRenderer.send('openChromePage', href),
  getViewTab: () => ipcRenderer.invoke('getViewTab'),
  pageTitleUpdated: (callback: (message: viewInter[]) => void): void => {
    ipcRenderer.on('page-title-updated', (_event, message) => callback(message))
  },
  goBack: (tabId: number) => ipcRenderer.send('nav-go-back', tabId),
  goForward: (tabId: number) => ipcRenderer.send('nav-go-forward', tabId),
  reload: (tabId: number) => ipcRenderer.send('nav-reload', tabId),
  pageStop: (tabId: number) => ipcRenderer.send('nav-stop', tabId),
  pageReloaded: (callback: (boolean: boolean) => void): void => {
    ipcRenderer.on('page-reloaded', (_event, boolean) => callback(boolean))
  },
  //在浏览器打开
  pageBrowser: (tabId: number) => ipcRenderer.send('open-in-browser', tabId),
  //tab设置
  changePageTab: (tabId: number) => ipcRenderer.send('change-page-tab', tabId),
  closePageTab: (tabId: number) => ipcRenderer.send('close-tab', tabId),
  pageMessage: (callback: (message: activeInter) => void): void => {
    ipcRenderer.on('page-message', (_event, message) => callback(message))
  }
}
