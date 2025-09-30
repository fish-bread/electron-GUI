import { Tab } from '../../../types/mian'
import { BrowserWindow } from 'electron'

class BaseChromeTab {
  public tabs: Tab[] = []
  public chromeWindow: BrowserWindow | null = null
  // 获取下一个ID
  public getNextId(): number {
    if (this.tabs.length === 0) return 0
    const maxId = Math.max(...this.tabs.map((tab) => tab.id))
    return maxId + 1
  }
}
export default new BaseChromeTab()
