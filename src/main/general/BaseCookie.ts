import Store from 'electron-store'
const store = new Store()
class BaseCookie {
  protected currentCookie: string = ''
  constructor(cookieName: 'pixivCookie' | 'bilibiliCookie') {
    this.getLocalCookie(cookieName)
  }
  //更改cookie
  setLocalCookie = (cookieData: string, cookieName: 'pixivCookie' | 'bilibiliCookie'): string => {
    this.currentCookie = cookieData
    store.set(cookieName, this.currentCookie)
    return this.currentCookie
  }
  //设置cookie
  setCookie = (cookie: string): void => {
    this.currentCookie = cookie
  }
  //从本地获取cookie
  getLocalCookie = (cookieName: 'pixivCookie' | 'bilibiliCookie'): string => {
    const cookie = store.get(cookieName)
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
