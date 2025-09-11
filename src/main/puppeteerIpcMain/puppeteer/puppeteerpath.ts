import BasePath from '../../general/BasePath'

class puppeteerPathClass extends BasePath {
  constructor(pythonFile: string) {
    super()
    this.chromePathFunc(pythonFile)
  }
  //还原chrome路径
  restorePathFunc = (): string => {
    return this.chromePathFunc('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  }
  private chromePathFunc = (newPath: string): string => {
    this.currentPath = newPath
    return this.currentPath
  }
}
export default new puppeteerPathClass('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
