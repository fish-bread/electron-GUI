import { dialog } from 'electron'

export const pathDialog = (): Promise<Electron.OpenDialogReturnValue> => {
  try {
    return dialog.showOpenDialog({
      title: '自定义运行路径',
      properties: ['openFile']
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}
