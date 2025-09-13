import { ipcRenderer } from 'electron'
export const globalSettingApi = {
  getPort: () => ipcRenderer.invoke('getPort'),
  setPort: (port: string) => ipcRenderer.send('setPort', port)
}
