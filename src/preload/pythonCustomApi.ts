import { ipcRenderer } from 'electron'
export const pythonCustomApi = {
  getCustomPythonPath: (): Promise<string> => ipcRenderer.invoke('getCustomPythonPath'), //自定义python路径
  runCustomPython: (): void => ipcRenderer.send('runCustomPython'), //自定义运行python
  killCustomPython: (): void => ipcRenderer.send('killCustomPython'), //自定义killPython
}
