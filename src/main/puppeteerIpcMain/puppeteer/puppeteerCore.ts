import puppeteer from 'puppeteer-core'
import type { Browser } from 'puppeteer-core'
import { puppeteerPrintFunc } from '../../general/allPrint'
import { puppeteerDataInter } from '../../../types/mian'
import puppeteerPath from '../puppeteer/puppeteerpath'
class PuppeteerCore {
  browser: Browser | null = null
  countdownInterval: NodeJS.Timeout | null = null
  //定时启动
  setTime = async (data: puppeteerDataInter): Promise<void> => {
    if (!data.time) data.time = 3
    await new Promise<void>((resolve) => {
      let remainingTime = data.time
      this.countdownInterval = setInterval(() => {
        puppeteerPrintFunc('success', `puppeteer脚本${remainingTime}秒后启动`)
        remainingTime--
        if (remainingTime < 0) {
          clearInterval(this.countdownInterval as NodeJS.Timeout)
          this.countdownInterval = null
          resolve()
        }
      }, 1000)
    })
  }
  //启动
  runPuppeteer = async (data: puppeteerDataInter): Promise<void> => {
    try {
      const chromePath = puppeteerPath.getPath()
      if (this.browser) {
        puppeteerPrintFunc('error', 'puppeteer已启动,请勿重复启动')
        return
      }
      if (!chromePath || !chromePath.endsWith('chrome.exe')) {
        puppeteerPrintFunc('error', '该浏览器不是一个有效的浏览器')
        return
      }
      this.browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: data.headless,
      })
      await this.setTime(data)
      const page = await this.browser.newPage()
      puppeteerPrintFunc('success', 'puppeteer已成功启动')
      await page.goto('https://www.pixiv.net/')
      puppeteerPrintFunc('success', `正在搜索图片,${data.href}`)
      setTimeout(() => {
        console.log('PuppeteerCore Page Loaded')
      }, 5000)
      await this.browser.close()
    } catch (e) {
      console.error('创建新页面失败:', e)
      puppeteerPrintFunc('error', `puppeteer报错,${e}`)
      throw e
    }
  }
  //杀死
  killPuppeteer = async (): Promise<void> => {
    if (this.browser) {
      puppeteerPrintFunc('success', 'puppeteer正在强制关闭')
      await this.browser.close()
      puppeteerPrintFunc('closed', 'puppeteer已成功关闭')
      this.browser = null
      clearInterval(this.countdownInterval as NodeJS.Timeout)
    } else {
      puppeteerPrintFunc('success', 'puppeteer未启动')
    }
  }
}
export default new PuppeteerCore()
