import { ipcRenderer } from 'electron'
import { isGoInter } from '../types/mian'
export const chromeApi = {
  openChromePage: (href: string) => ipcRenderer.send('openChromePage', href),
  pageTitleUpdated: (callback: (message: string) => void): void => {
    ipcRenderer.on('page-title-updated', (_event, message) => callback(message))
  },
  goBack: () => ipcRenderer.send('nav-go-back'),
  goForward: () => ipcRenderer.send('nav-go-forward'),
  reload: () => ipcRenderer.send('nav-reload'),
  pageReloaded: (callback: (boolean: boolean) => void): void => {
    ipcRenderer.on('page-reloaded', (_event, boolean) => callback(boolean))
  },
  pageIsGo: (callback: (status: isGoInter) => void): void => {
    ipcRenderer.on('page-is-go', (_event, status) => callback(status))
  }
}
