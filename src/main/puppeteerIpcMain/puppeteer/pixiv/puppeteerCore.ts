import type { Browser, Page } from 'puppeteer-core'
import puppeteer from 'puppeteer-core'
import { puppeteerPrintFunc } from '../../../general/allPrint'
import {
  pixivBodyInter,
  pixivHrefInter,
  puppeteerDataInter,
  searchPixivInter
} from '../../../../types/mian'
import puppeteerPath from '../puppeteerpath'
import PixivCookie from './pixivCookie'
import pixivPath from './pixivPath'
import baseAxios from '../../../general/BaseAxios'
import fs from 'fs'
import { join } from 'path'
import { puppeteerProgressFunc } from '../../../general/allProgerss'
import { v4 as uuidv4 } from 'uuid'
import pLimit from 'p-limit'
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
      //设置代理端口
      baseAxios.setLocalPort('basePort', data.port)
      //获取浏览器路径
      const chromePath = puppeteerPath.getPath()
      if (this.browser) {
        puppeteerPrintFunc('error', 'puppeteer已启动,请勿重复启动')
        return
      }
      if (!chromePath || !chromePath.endsWith('chrome.exe')) {
        puppeteerPrintFunc('error', '该浏览器不是一个有效的浏览器')
        return
      }
      //启动浏览器
      this.browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: data.headless,
        defaultViewport: {
          width: 1500,
          height: 720
        }
      })
      //设置cookies
      this.setPixivCookie(PixivCookie.getCookies())
      const page = await this.browser.newPage()
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      )
      //延迟启动
      await this.setTime(data)
      puppeteerPrintFunc('success', 'puppeteer已成功启动')
      //解析pid网址
      const PageUrl = await this.analyzeHrefFunc(data.href)
      if (!PageUrl) {
        puppeteerPrintFunc('error', `puppeteer报错,链接无效或找不到图片`)
        return
      }
      //查询图片函数
      const searchData = await this.searchPixivFunc(page, PageUrl)
      if (!searchData) {
        puppeteerPrintFunc('error', '未查询到图片,请确认链接是否正确或网络是否畅通')
        await this.exitPuppeteer()
        return
      }
      //查询pid名字函数
      const PidName = await this.searchNamePixivFunc(page, PageUrl)
      //下载图片
      const allTime = await this.downloadPixivAxios(searchData, PidName, data.useProxy)
      puppeteerPrintFunc('success', `puppeteer执行完成,共耗时${allTime}秒`)
      //关闭浏览器实例
      await this.exitPuppeteer()
    } catch (e) {
      puppeteerPrintFunc('error', `puppeteer报错,${e}`)
      await this.exitPuppeteer()
    }
  }
  //设置pixivCookie
  setPixivCookie = (cookieSet: string): void => {
    const cookies = cookieSet.split('; ').map((pair) => {
      const [name, ...valueParts] = pair.split('=')
      const value = valueParts.join('=')
      // 对URL编码的值进行解码
      const decodedValue = decodeURIComponent(value || '')
      // 返回完整的Cookie对象
      return {
        name: name.trim(),
        value: decodedValue,
        domain: '.pixiv.net',
        path: '/',
        secure: true,
        httpOnly: false,
        sameSite: 'Lax' as const
      }
    })
    this.browser?.setCookie(...cookies)
  }
  //查询图片函数
  searchPixivFunc = async (
    page: Page,
    PageUrl: pixivHrefInter
  ): Promise<searchPixivInter | null> => {
    //监听请求,获取全部图片链接
    let pageText: pixivBodyInter
    let urlsArray: string[] = []
    page.on('response', async (response) => {
      if (response.url() === PageUrl.ajaxHref) {
        console.log('请求', response.url())
        pageText = await response.json()
        urlsArray = pageText.body.map((allUrl) => {
          return allUrl.urls.original
        })
        puppeteerPrintFunc(
          'success',
          `成功获取到${urlsArray.length}张图片,所有原始图片链接数组, ${urlsArray}`
        )
        return
      }
    })
    //打开页面
    await page.goto(PageUrl.ajaxHref, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('body')
    puppeteerPrintFunc('success', '成功查询到当前pid图片网址,请稍后')
    //前往page页面
    await page.goto(PageUrl.imgHref, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('body')
    return {
      urlsArray: urlsArray,
      PageUrl: PageUrl
    }
  }
  //查询pid图片名称函数
  searchNamePixivFunc = async (page: Page, href: pixivHrefInter): Promise<string> => {
    await page.goto(href.imgHref, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('body')
    await page.waitForSelector('h1')
    return await page.$eval('h1', (h1) => {
      return h1.innerHTML
    })
  }
  //分析用户输入的网址或pid
  analyzeHrefFunc = async (href: string): Promise<pixivHrefInter | null> => {
    const pixivArtworkIdPattern =
      /(?:(?:https?:\/\/)?(?:www\.)?pixiv\.net\/artworks\/)?(\d+)(?:\?[^#\s]*)?/i

    // 尝试从输入字符串中匹配pid
    const match = href.match(pixivArtworkIdPattern)

    if (match && match[1]) {
      // 如果匹配成功，提取PID并构建标准URL
      const pid = match[1]
      const imgHref = `https://www.pixiv.net/artworks/${pid}`
      const ajaxHref = `https://www.pixiv.net/ajax/illust/${pid}/pages?lang=zh`
      return {
        ajaxHref: ajaxHref,
        imgHref: imgHref
      }
    } else {
      // 如果输入无法识别，可以根据需要返回默认值或抛出异常
      console.error('无法从输入中提取有效的Pixiv艺术作品ID:', href)
      return null
    }
  }
  //下载图片函数
  downloadPixivAxios = async (
    searchData: searchPixivInter,
    PidName: string,
    useProxy: boolean
  ): Promise<number> => {
    const downloadDir = pixivPath.getPath()
    let allTime: number = 0
    puppeteerPrintFunc('success', `图片将保存至目录: ${downloadDir},开始遍历下载图片`)
    //创建并发限制器,设置最大并发数5
    const limit = pLimit(5)
    const downloadPromises: Promise<void>[] = []
    //检查图片是否路径文件夹是否存在
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true })
    }
    //设置是否启用代理请求
    const pixivAxiosFunc = useProxy ? baseAxios.agentAxios : baseAxios.noAgentAxios
    for (let i = 0; i < searchData.urlsArray.length; i++) {
      const promise = limit(async () => {
        try {
          //获取信息
          const dataTime: number = Date.now()
          //将url作为文件名
          const imageUrl = searchData.urlsArray[i]
          const urlObj = new URL(imageUrl)
          const imageName = urlObj.pathname.split('/').pop() || `image_${i}.jpg`
          const fileName = `${PidName}_${imageName}`
          const filePath = join(downloadDir, fileName)

          //请求图片
          const response = await pixivAxiosFunc({
            headers: {
              Referer: searchData.PageUrl.imgHref,
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
              Cookie: PixivCookie.getCookies()
            },
            url: searchData.urlsArray[i],
            responseType: 'stream'
          })
          //获取文件总长度
          let downloadedSize = 0
          const contentLength = parseInt(response.headers['content-length'])
          // 创建写入流
          const writer = fs.createWriteStream(filePath)
          //写入数据
          response.data.pipe(writer)
          //生成唯一uuid
          const taskId = uuidv4()
          //更新进度
          response.data.on('data', (chunk: Buffer) => {
            downloadedSize += chunk.length
            const progress =
              contentLength > 0 ? Math.round((downloadedSize / contentLength) * 100) : 0
            puppeteerProgressFunc('success', `图片${fileName}正在下载`, progress, taskId)
          })
          response.data.on('end', () => {
            const taskElapsedTimeMs = Date.now() - dataTime // 计算单个任务耗时（毫秒）
            const taskElapsedTimeSec = Number((taskElapsedTimeMs / 1000).toFixed(2)) // 转换为秒，并保留两位小数得到数字类型
            puppeteerProgressFunc(
              'closed',
              `图片${fileName}下载完成,耗时${taskElapsedTimeSec}秒`,
              100,
              taskId
            )
            allTime = allTime + taskElapsedTimeSec
            downloadedSize = 0
          })
          // 等待下载完成
          await new Promise<void>((resolve, reject) => {
            writer.on('finish', () => {
              resolve()
            })
            writer.on('error', (error) => {
              puppeteerPrintFunc('error', `下载图片${fileName}失败,请检查vpn或网路是否正常`)
              reject(error)
            })
          })
        } catch (e) {
          console.error('axios请求报错', e)
          puppeteerPrintFunc(
            'error',
            `获取图片${searchData.urlsArray[i]}失败,请检查vpn或网路是否正常`
          )
        }
      })
      downloadPromises.push(promise)
    }
    //等待所有下载任务完成
    await Promise.all(downloadPromises)
    puppeteerPrintFunc('success', '所有图片下载任务已完成！')
    return allTime
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
  //退出puppeteer
  exitPuppeteer = async (): Promise<void> => {
    if (this.browser) {
      clearInterval(this.countdownInterval as NodeJS.Timeout)
      await this.browser.close()
      this.browser = null
      puppeteerPrintFunc('closed', 'puppeteer已停止运行')
    } else {
      clearInterval(this.countdownInterval as NodeJS.Timeout)
      puppeteerPrintFunc('closed', 'puppeteer已停止运行')
    }
  }
}
export default new PuppeteerCore()
