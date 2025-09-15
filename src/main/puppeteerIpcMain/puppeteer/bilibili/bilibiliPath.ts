import BasePath from '../../../general/BasePath'
import { app } from 'electron'
import { join } from 'path'
import Store from 'electron-store'
const store = new Store()
class BilibiliPath extends BasePath {
  constructor(path: string) {
    super()
    this.setPixivFilePath(path)
  }
  //还原
  restoreBilibiliPathFunc = (): string => {
    store.delete('bilibiliPath')
    return this.setPixivFilePath('bilibili_video')
  }
  //设置文件下载位置
  private setPixivFilePath = (pythonFile: string): string => {
    const localPath = this.getLocalPath('bilibiliPath')
    if (localPath) {
      this.currentPath = localPath
      return this.currentPath
    }
    if (app.isPackaged) {
      this.setLocalPath('bilibiliPath', join(app.getAppPath(), '..', `${pythonFile}`))
    } else {
      this.setLocalPath('bilibiliPath', join(__dirname, '..', '..', 'resources', `${pythonFile}`))
    }
    return this.currentPath
  }
}
export default new BilibiliPath('bilibili_video')
