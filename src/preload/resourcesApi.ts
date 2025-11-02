import { ipcRenderer } from 'electron'
import { sendPost } from '../types/ru34'
export const resourcesApi = {
  showResources: (filePath: sendPost) => ipcRenderer.send('show-resources', filePath), //资源页面
  resourcesPath: (callback: (message: sendPost) => void): void => {
    ipcRenderer.on('resources-path', (_event, message) => callback(message))
  }
}
