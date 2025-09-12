import { ipcRenderer } from 'electron'
// 导出所有与Python相关的API
export const pythonApi = {
  runPython: (time: number): Promise<void> => ipcRenderer.invoke('runPython', time),
  killPython: (): void => ipcRenderer.send('killPython'),
  choosePython: (): Promise<void> => ipcRenderer.invoke('choosePython'),
  getPythonPath: (): Promise<string> => ipcRenderer.invoke('getPythonPath'),
  restorePythonPath: (): Promise<string> => ipcRenderer.invoke('restorePythonPath'),
  runPuppeteer: (): Promise<void> => ipcRenderer.invoke('runPuppeteer')
}
