import { join } from 'path'
import { app } from 'electron'
import BasePath from '../../general/BasePath'
class PythonPath extends BasePath {
  constructor(pythonFile: string) {
    super()
    this.pythonScriptPathFunc(pythonFile)
  }
  //python路径
  private pythonScriptPathFunc(pythonFile: string): string {
    const pythonPath = this.getLocalPath('pythonPath')
    if (pythonPath) {
      this.currentPath = pythonPath
      return this.currentPath
    }
    if (app.isPackaged) {
      this.setLocalPath(
        'pythonPath',
        join(app.getAppPath(), '../app.asar.unpacked/python/src', `${pythonFile}`)
      )
    } else {
      this.setLocalPath('pythonPath', join(__dirname, '..', '..', 'python', 'src', `${pythonFile}`))
    }
    return this.currentPath
  }
}
export default new PythonPath('main.py')
