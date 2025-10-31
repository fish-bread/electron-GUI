import { ipcRenderer } from 'electron'
import { ru34Request, sendPost } from '../types/ru34'
export const ru34Api = {
  ru34Search: (ru34Request: ru34Request) => ipcRenderer.invoke('ru34Search', ru34Request),
  ru34SearchTabs: (ru34Request: ru34Request) => ipcRenderer.invoke('ru34SearchTabs', ru34Request),
  addFavorite: (postData: sendPost) => ipcRenderer.invoke('ru34AddFavorite', postData),
  handleFavoriteList: (callback: (message: sendPost[]) => void): void => {
    ipcRenderer.on('handleFavoriteList', (_event, message) => callback(message))
  },
  favoriteList: () => ipcRenderer.invoke('favoriteList')
}
