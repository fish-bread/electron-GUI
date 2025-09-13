import { join } from 'path'
import { app } from 'electron'
import BasePath from '../../general/BasePath'
import Store from 'electron-store'
const store = new Store()
class customPythonPath extends BasePath {
  constructor(pythonFile: string) {
    super()
    this.pythonScriptPathFunc(pythonFile)
  }
  //还原自定义python路径
  restorePythonScriptPathFunc = (): string => {
    store.delete('customPythonPath')
    return this.pythonScriptPathFunc('main.py')
  }
  //自定义python路径
  private pythonScriptPathFunc(pythonFile: string): string {
    const pythonPath = this.getLocalPath('customPythonPath')
    if (pythonPath) {
      this.currentPath = pythonPath
      return this.currentPath
    }
    if (app.isPackaged) {
      this.setLocalPath(
        'customPythonPath',
        join(app.getAppPath(), '../app.asar.unpacked/python/src', `${pythonFile}`)
      )
    } else {
      this.setLocalPath(
        'customPythonPath',
        join(__dirname, '..', '..', 'python', 'src', `${pythonFile}`)
      )
    }
    return this.currentPath
  }
}
export default new customPythonPath('main.py')
