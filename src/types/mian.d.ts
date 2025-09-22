export interface allMessageInter {
  status: 'info' | 'error' | 'closed'
  dataTime: string
  message: string
}
export interface allProgressInter {
  status: 'info' | 'error' | 'closed'
  message: string
  progress: number
  taskId: string
}
export interface UnifiedMessage {
  type: 'text' | 'progress'
  data: allMessageInter | allProgressInter
}
export interface pythonFilePath {
  canceled: boolean
  filePath: string
}
//puppeteerPixiv向主进程传值
export interface puppeteerDataInter {
  time: number
  href: string
  headless: boolean
  useProxy: boolean
  port: string
}
//cookie设置
export interface cookieInter {
  cookie: string
  href: string
}
export interface pixivHrefInter {
  ajaxHref: string
  imgHref: string
}
export interface pixivBodyInter {
  body: pixivUrlsInter[]
}
export interface pixivUrlsInter {
  urls: pixivUrlInter
}
export interface pixivUrlInter {
  thumb_mini: string
  small: string
  regular: string
  original: string
}
export interface searchPixivInter {
  urlsArray: string[]
  PageUrl: pixivHrefInter
}
//bilibili
export interface searchBilibiliInter {
  videoHref: string
  audioHref: string
  videoName: string
}
export interface bilibiliResInter {
  audio: bilibiliResAudioInter[]
  video: bilibiliResVideoInter[]
}
export interface bilibiliResAudioInter {
  baseUrl: string
}
export interface bilibiliResVideoInter {
  baseUrl: string
}
export interface bilibiliFfmpegInter {
  filePath: string
  allTime: number
}
//其他
export interface selectInter {
  label: string
  value: number
}
export interface netSpeedInter {
  lastUpdateTime: number // 上次计算网速的时间戳
  lastDownloadedSize: number // 上次计算网速时已下载的字节数
  lastFormattedSpeed: string // 上一次格式化后的速度显示字符串
  lastReportTime: number // 上次报告时间戳（用于节流控制）
}
export interface progressInter {
  chunk: Buffer
  downloadedSize: number
  contentLength: number
}
//设置标题
export interface settingTitle {
  pixiv: string
  bilibili: string
}
