import axios, { AxiosInstance } from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'
import Store from 'electron-store'
const store = new Store()
type keyInter = 'basePort'
class BaseAxios {
  host: string = '127.0.0.1'
  port: string = '7897'
  httpsAgent: HttpsProxyAgent<string> = new HttpsProxyAgent(`http://${this.host}:${this.port}`)
  constructor(port: string) {
    this.setPort('basePort', port)
  }
  //设置本地端口并修改代理
  setLocalPort = (key: keyInter, port: string): void => {
    store.set(key, port)
    this.port = port
    this.httpsAgent = new HttpsProxyAgent(`http://${this.host}:${this.port}`)
    console.log('修改后的代理端口为', this.port)
  }
  //读取本地port端口
  getLocalPort = (key: keyInter): string | null => {
    const port = store.get(key)
    if (port) {
      return String(port)
    } else {
      return null
    }
  }
  //初始化port端口
  setPort = (key: keyInter, port: string): void => {
    const allPort = this.getLocalPort(key)
    if (allPort) {
      this.port = allPort
      this.httpsAgent = new HttpsProxyAgent(`http://${this.host}:${this.port}`)
    } else {
      this.port = port
      this.httpsAgent = new HttpsProxyAgent(`http://${this.host}:${this.port}`)
    }
  }
  //读取port端口
  getPort = (): string => {
    console.log('代理端口', this.port)
    return this.port
  }
  //使用代理
  agentAxios: AxiosInstance = axios.create({
    proxy: false,
    timeout: 10000,
    httpsAgent: this.httpsAgent
  })
  //不使用代理
  noAgentAxios: AxiosInstance = axios.create({
    timeout: 10000
  })
}
export default new BaseAxios('7897')
