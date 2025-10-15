import { dialog } from 'electron'

export const pathsDialog = (): Promise<Electron.OpenDialogReturnValue> => {
  try {
    return dialog.showOpenDialog({
      title: '自定义运行路径',
      properties: ['openFile', 'multiSelections']
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}
