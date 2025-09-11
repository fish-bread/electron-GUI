import { join } from 'path'
import { app } from 'electron'
import BasePath from '../../general/BasePath'
class PythonPath extends BasePath {
  constructor(pythonFile: string) {
    super()
    this.pythonScriptPathFunc(pythonFile)
  }
  //还原python路径
  restorePythonScriptPathFunc = (): string => {
    return this.pythonScriptPathFunc('main.py')
  }
  //python路径
  private pythonScriptPathFunc(pythonFile: string): string {
    if (app.isPackaged) {
      this.currentPath = join(app.getAppPath(), '../app.asar.unpacked/python/src', `${pythonFile}`)
    } else {
      this.currentPath = join(__dirname, '..', '..', 'python', 'src', `${pythonFile}`)
    }
    return this.currentPath
  }
}
export default new PythonPath('main.py')
