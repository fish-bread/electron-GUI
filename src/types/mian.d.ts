export interface pythonMessageInter {
  status: 'success' | 'error' | 'closed'
  message: string
}
export interface allProgressInter {
  status: 'success' | 'error' | 'closed'
  message: string
  progress: number
  taskId: string
}
export interface UnifiedMessage {
  type: 'text' | 'progress'
  data: pythonMessageInter | allProgressInter
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
export interface selectInter {
  label: string
  value: number
}
