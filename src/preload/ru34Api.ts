import { ipcRenderer } from 'electron'
import { ru34Request } from '../types/ru34'
export const ru34Api = {
  ru34Search: (ru34Request: ru34Request) => ipcRenderer.invoke('ru34Search', ru34Request),
  ru34SearchTabs: (ru34Request: ru34Request) => ipcRenderer.invoke('ru34SearchTabs', ru34Request)
}
