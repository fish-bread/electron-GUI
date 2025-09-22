import { puppeteerPrintFunc } from './allPrint'
import puppeteer, { Browser, Page } from 'puppeteer-core'
import { puppeteerDataInter, cookieInter, netSpeedInter, progressInter } from '../../types/mian'
import puppeteerPath from '../puppeteerIpcMain/puppeteer/puppeteerpath'
import baseAxios from './BaseAxios'
class BasePuppeteer {
  browser: Browser | null = null
  page: Page | null = null
  countdownInterval: NodeJS.Timeout | null = null
  cancelToken: AbortController = baseAxios.createCancelToken()
  //设置端口
  setPort = (port: string): void => {
    //设置代理端口
    baseAxios.setLocalPort('basePort', port)
  }
  //获取路径
  getChromePath = (): string => {
    return puppeteerPath.getPath()
  }
  //检测重复启动或浏览器路径错误并返回浏览器路径
  lockedPuppeteer = (chromePath: string): boolean => {
    if (this.browser) {
      puppeteerPrintFunc('error', 'puppeteer已启动,请勿重复启动')
      return false
    } else if (!chromePath || !chromePath.endsWith('chrome.exe')) {
      puppeteerPrintFunc('error', '该浏览器不是一个有效的浏览器')
      return false
    } else {
      return true
    }
  }
  //定时启动
  setTime = async (data: puppeteerDataInter): Promise<void> => {
    if (!data.time) data.time = 3
    await new Promise<void>((resolve) => {
      let remainingTime = data.time
      this.countdownInterval = setInterval(() => {
        puppeteerPrintFunc('info', `puppeteer脚本${remainingTime}秒后启动`)
        remainingTime--
        if (remainingTime < 0) {
          clearInterval(this.countdownInterval as NodeJS.Timeout)
          this.countdownInterval = null
          resolve()
        }
      }, 1000)
    })
  }
  //启动puppeteer并设置puppeteer
  startPuppeteer = async (
    data: puppeteerDataInter,
    chromePath: string,
    cookieData: cookieInter
  ): Promise<void> => {
    this.browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: data.headless,
      defaultViewport: {
        width: 1500,
        height: 720
      }
    })
    //设置cookies
    this.setCookie(cookieData)
    this.page = await this.browser.newPage()
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    )
    //延迟启动
    await this.setTime(data)
    puppeteerPrintFunc('info', 'puppeteer已成功启动')
  }
  //设置cookie
  setCookie = (cookieData: cookieInter): void => {
    const cookies = cookieData.cookie.split('; ').map((pair) => {
      const [name, ...valueParts] = pair.split('=')
      const value = valueParts.join('=')
      // 对URL编码的值进行解码
      const decodedValue = decodeURIComponent(value || '')
      // 返回完整的Cookie对象
      return {
        name: name.trim(),
        value: decodedValue,
        domain: cookieData.href,
        path: '/',
        secure: true,
        httpOnly: false,
        sameSite: 'Lax' as const
      }
    })
    this.browser?.setCookie(...cookies)
  }
  //杀死
  killPuppeteer = async (): Promise<void> => {
    if (this.browser) {
      puppeteerPrintFunc('info', 'puppeteer正在强制关闭')
      await this.browser.close()
      puppeteerPrintFunc('closed', 'puppeteer已成功关闭')
      this.browser = null
      clearInterval(this.countdownInterval as NodeJS.Timeout)
      this.cancelToken.abort()
      this.cancelToken = baseAxios.createCancelToken()
    } else {
      this.browser = null
      clearInterval(this.countdownInterval as NodeJS.Timeout)
      this.cancelToken.abort()
      this.cancelToken = baseAxios.createCancelToken()
      puppeteerPrintFunc('info', 'puppeteer未启动')
    }
  }
  //退出puppeteer
  exitPuppeteer = async (): Promise<void> => {
    if (this.browser) {
      clearInterval(this.countdownInterval as NodeJS.Timeout)
      await this.browser.close()
      this.browser = null
      this.page = null
      puppeteerPrintFunc('closed', 'puppeteer已停止运行')
    } else {
      clearInterval(this.countdownInterval as NodeJS.Timeout)
      puppeteerPrintFunc('closed', 'puppeteer已停止运行')
    }
  }
  //去除特殊字符并用_替代
  sanitizeFilename = (filename: string): string => {
    //定义非法字符的正则表达式模式
    //包括Windows和Linux系统不支持的字符，以及中文标点符号和空格
    const illegalCharsPattern = /[\\/:*?"<>|：？？！，。；'‘'""""\s]/g
    //将非法字符替换为下划线
    let cleaned = filename.replace(illegalCharsPattern, '_')
    //移除连续的下划线（例如将"___"替换为"_"）
    cleaned = cleaned.replace(/_{2,}/g, '_')
    //移除开头和结尾的下划线
    cleaned = cleaned.replace(/^_+|_+$/g, '')
    //限制文件名长度（避免过长的文件名）
    const maxLength = 100
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength)
    }
    //确保文件名非空
    if (cleaned.length === 0) {
      cleaned = 'untitled'
    }
    return cleaned
  }
  //计算网速
  downloadNetSpeed = (netSpeed: netSpeedInter, downloadedSize: number): string => {
    const now = Date.now()
    const timeSinceLastReport = (now - netSpeed.lastReportTime) / 1000 // 转换为秒

    //节流控制:如果距离上次报告不足1秒，直接返回上一次的格式化结果
    if (timeSinceLastReport < 1) {
      return netSpeed.lastFormattedSpeed
    }
    //计算瞬时速度
    const timeInterval = (now - netSpeed.lastUpdateTime) / 1000
    const dataInterval = downloadedSize - netSpeed.lastDownloadedSize
    const currentSpeed = dataInterval / timeInterval //计算网速 B/s
    //更新记录
    netSpeed.lastDownloadedSize = downloadedSize
    netSpeed.lastUpdateTime = now
    netSpeed.lastReportTime = now
    //格式化网速显示
    const formattedSpeed = this.formatSpeed(currentSpeed)
    netSpeed.lastFormattedSpeed = formattedSpeed
    return formattedSpeed
  }
  //将格式化函数提取为单独的方法，便于复用
  private formatSpeed = (speedBytes: number): string => {
    if (speedBytes <= 0) return `0.00 KB/s`
    const speedKB = speedBytes / 1024
    if (speedKB >= 1024) {
      const speedMB = speedKB / 1024
      return `${speedMB.toFixed(2)} MB/s`
    } else {
      return `${speedKB.toFixed(2)} KB/s`
    }
  }
  //计算进度
  downloadProgress = (data: progressInter): number => {
    return data.contentLength > 0 ? Math.round((data.downloadedSize / data.contentLength) * 100) : 0
  }
}
export default BasePuppeteer
