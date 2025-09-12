import { app } from 'electron'
import { join } from 'path'
import BasePath from '../../../general/BasePath'

class pixivPathClass extends BasePath {
  constructor(path: string) {
    super()
    this.setPixivFilePath(path)
  }
  //还原
  restorePixivPathFunc = (): string => {
    return this.setPixivFilePath('pixiv_image')
  }
  //设置文件下载位置
  private setPixivFilePath = (pythonFile: string): string => {
    if (app.isPackaged) {
      this.currentPath = join(app.getAppPath(), '..', `${pythonFile}`)
    } else {
      this.currentPath = join(__dirname, '..', '..', 'resources', `${pythonFile}`)
    }
    return this.currentPath
  }
}
export default new pixivPathClass('pixiv_image')
