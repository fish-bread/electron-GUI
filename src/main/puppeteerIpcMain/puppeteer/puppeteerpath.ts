import BasePath from '../../general/BasePath'
import Store from 'electron-store'
const store = new Store()
class puppeteerPathClass extends BasePath {
  constructor(pythonFile: string) {
    super()
    this.chromePathFunc(pythonFile)
  }
  //还原chrome路径
  restorePathFunc = (): string => {
    store.delete('chromePath')
    return this.chromePathFunc('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  }
  //设置path
  private chromePathFunc = (newPath: string): string => {
    const chromePath = this.getLocalPath('chromePath')
    if (chromePath) {
      this.currentPath = chromePath
    } else {
      this.currentPath = newPath
    }
    return this.currentPath
  }
}
export default new puppeteerPathClass('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
