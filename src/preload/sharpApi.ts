import { ipcRenderer } from 'electron'

export const sharpApi = {
  sharpImage: () => ipcRenderer.invoke('sharp-image'),
  sharpImageChange: (filepath: string[]) => ipcRenderer.invoke('sharp-image-change', filepath),
}
