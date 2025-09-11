import { dialog } from 'electron'

export const savePathDialog = (): Promise<Electron.OpenDialogReturnValue> => {
  try {
    return dialog.showOpenDialog({
      title: '自定义运行路径',
      properties: ['openDirectory']
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}
