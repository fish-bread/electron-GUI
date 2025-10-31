import Store from 'electron-store'
import { sendPost } from '../../../types/ru34'
import { getWindow } from '../../func/windowFunc'
const store = new Store()
class ru34Class {
  private ru34FavoriteList: Array<sendPost> = []
  HandleRu34Tabs = (tabs: string): string => {
    console.log('修改前', tabs)
    console.log('修改后', tabs.replace(/ /g, '+'))
    return tabs.replace(/ /g, '+')
  }
  SearchRu34Tabs = (tabs: string): string => {
    //查找最后一个空格的位置
    const lastSpaceIndex = tabs.lastIndexOf(' ')
    //如果找到了空格，则截取空格后的部分；否则返回原字符串
    if (lastSpaceIndex !== -1) {
      return tabs.substring(lastSpaceIndex + 1)
    }
    return tabs
  }
  //添加到本地
  addFavoriteList = (postData: sendPost): boolean => {
    this.ru34FavoriteList = store.get('ru34FavoriteList', []) as sendPost[]
    // 检查是否已存在（避免重复添加）
    const exists = this.ru34FavoriteList.some((item) => item.id === postData.id)
    if (!exists) {
      this.ru34FavoriteList.push(postData)
      store.set('ru34FavoriteList', this.ru34FavoriteList)
      const targetWindow = getWindow(1)
      targetWindow?.webContents.send('handleFavoriteList', this.ru34FavoriteList)
      return true
    }
    return false
  }
  //查询本地
  searchLocalFavoriteList = (): sendPost[] => {
    const list = store.get('ru34FavoriteList') as sendPost[]
    if (!list) {
      return []
    }
    return list
  }
}
//获取本地记录
export default new ru34Class()
