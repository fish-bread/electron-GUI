import Store from 'electron-store'
const store = new Store()
class BaseCookie {
  protected currentCookie: string = ''
  constructor() {
    this.getLocalCookie()
  }
  //更改cookie
  setLocalCookie = (cookieData: string): string => {
    this.currentCookie = cookieData
    store.set('pixivCookie', this.currentCookie)
    return this.currentCookie
  }
  //设置cookie
  setCookie = (cookie: string): void => {
    this.currentCookie = cookie
  }
  //从本地获取cookie
  getLocalCookie = (): string => {
    const cookie = store.get('pixivCookie')
    if (cookie) {
      this.setCookie(String(cookie))
      return String(cookie)
    } else {
      return 'null'
    }
  }
  //获取cookie
  getCookies = (): string => {
    return this.currentCookie
  }
}
export default BaseCookie
