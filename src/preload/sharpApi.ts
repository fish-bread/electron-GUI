import { ipcRenderer } from 'electron'

export const sharpApi = {
  sharpImage: (chooseType: string) => ipcRenderer.invoke('sharp-image', chooseType),
  sharpImageChange: (filepath: string[], chooseType: string, qualityLeave: number) =>
    ipcRenderer.invoke('sharp-image-change', filepath, chooseType, qualityLeave)
}
