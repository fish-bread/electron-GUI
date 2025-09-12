export interface pythonMessageInter {
  status: 'success' | 'error' | 'closed'
  message: string
}
export interface allProgressInter {
  status: 'success' | 'error' | 'closed'
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
export interface puppeteerDataInter {
  time: number
  href: string
  headless: boolean
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
