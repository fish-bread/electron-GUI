export interface pythonMessageInter {
  status: 'success' | 'error' | 'closed'
  message: string
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
