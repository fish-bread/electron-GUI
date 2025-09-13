import { app } from 'electron'
import { join } from 'path'
import BasePath from '../../../general/BasePath'

import Store from 'electron-store'
const store = new Store()
class pixivPathClass extends BasePath {
  constructor(path: string) {
    super()
    this.setPixivFilePath(path)
  }
  //还原
  restorePixivPathFunc = (): string => {
    store.delete('pixivPath')
    return this.setPixivFilePath('pixiv_image')
  }
  //设置文件下载位置
  private setPixivFilePath = (pythonFile: string): string => {
    const localPath = this.getLocalPath('pixivPath')
    if (localPath) {
      this.currentPath = localPath
      return this.currentPath
    }
    if (app.isPackaged) {
      this.setLocalPath('pixivPath', join(app.getAppPath(), '..', `${pythonFile}`))
    } else {
      this.setLocalPath('pixivPath', join(__dirname, '..', '..', 'resources', `${pythonFile}`))
    }
    return this.currentPath
  }
}
export default new pixivPathClass('pixiv_image')
