import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { pythonApi } from './pythonApi'
import { PuppeteerApi } from './puppeteerApi'
import { outPutApi } from './outputApi'

// Custom APIs for renderer
const api = {
  ...pythonApi,
  ...PuppeteerApi,
  ...outPutApi,
  maxSizeFunc: () => ipcRenderer.send('maxSizeFunc'), //最大化
  minimizeFunc: () => ipcRenderer.send('minimizeFunc'), //最小化
  closeWindowFunc: () => ipcRenderer.send('closeWindowFunc') //关闭
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
