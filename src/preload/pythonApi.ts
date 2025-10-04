import { ipcRenderer } from 'electron'
// 导出所有与Python相关的API
export const pythonApi = {
  runPython: (time: number): void => ipcRenderer.send('runPython', time),
  killPython: (): void => ipcRenderer.send('killPython'),
  choosePython: (): Promise<void> => ipcRenderer.invoke('choosePython'),
  getPythonPath: (): Promise<string> => ipcRenderer.invoke('getPythonPath'),
  restorePythonPath: (): Promise<string> => ipcRenderer.invoke('restorePythonPath'),
  getCustomPythonPath: (): Promise<string> => ipcRenderer.invoke('getCustomPythonPath'), //自定义python路径
  runCustomPython: (): void => ipcRenderer.send('runCustomPython'), //自定义运行python
  killCustomPython: (): void => ipcRenderer.send('killCustomPython'), //自定义killPython
}
