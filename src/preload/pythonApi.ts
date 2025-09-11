import { ipcRenderer } from 'electron'
import type { pythonMessageInter } from '../types/mian'

// 导出所有与Python相关的API
export const pythonApi = {
  runPython: (time: number): Promise<void> => ipcRenderer.invoke('runPython', time),
  killPython: (): void => ipcRenderer.send('killPython'),
  pythonOutput: (callback: (message: pythonMessageInter) => void): void => {
    ipcRenderer.on('pythonOutput', (_event, message) => callback(message))
  },
  choosePython: (): Promise<void> => ipcRenderer.invoke('choosePython'),
  getPythonPath: (): Promise<string> => ipcRenderer.invoke('getPythonPath'),
  restorePythonPath: (): Promise<string> => ipcRenderer.invoke('restorePythonPath'),
  runPuppeteer: (): Promise<void> => ipcRenderer.invoke('runPuppeteer')
}
