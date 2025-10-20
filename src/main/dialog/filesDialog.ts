import { dialog } from 'electron'

export const pathsImgDialog = (Type: string): Promise<Electron.OpenDialogReturnValue> => {
  try {
    if (Type === 'all') {
      return dialog.showOpenDialog({
        title: `选择图片路径`,
        filters: [{ name: '图片文件', extensions: ['jpg', 'jpeg', 'png', 'webp'] }],
        properties: ['openFile', 'multiSelections']
      })
    }
    return dialog.showOpenDialog({
      title: `选择${Type}图片路径`,
      filters: [{ name: `${Type}文件`, extensions: [`${Type}`] }],
      properties: ['openFile', 'multiSelections']
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}
