import { ipcRenderer } from 'electron'
import { chooseTypeInter } from '../types/sharp'

export const sharpApi = {
  sharpImage: (chooseType: chooseTypeInter) => ipcRenderer.invoke('sharp-image', chooseType),
  sharpImageChange: (filepath: string[], chooseType: string, qualityLeave: number) =>
    ipcRenderer.invoke('sharp-image-change', filepath, chooseType, qualityLeave),
}
