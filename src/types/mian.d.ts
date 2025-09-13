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
export interface selectInter {
  label: string
  value: number
}
