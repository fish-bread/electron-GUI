import { ipcMain, net, protocol } from 'electron'

export const localFileProtocol = (): void => {
  //解析路径传化
  protocol.handle('safe-local', (request) => {
    //解码URL并移除协议部分
    const fileUrl = decodeURIComponent(request.url.replace('safe-local://', ''))
    //处理Windows路径的特殊情况（C& → C:）
    const fixedPath = fileUrl.replace(/^([A-Za-z])&/, '$1:')
    //替换所有反斜杠为正斜杠（Windows路径兼容）
    const normalizedPath = fixedPath.replace(/\\/g, '/')
    //使用net.fetch加载文件
    return net.fetch(`file:///${normalizedPath}`)
  })
  //暴露pathToFileURL给渲染进程
  ipcMain.handle('path-to-file-url', (_, filePath) => {
    //处理Windows路径的特殊情况（C: → C&）
    const safePath = filePath.replace(/^([A-Za-z]):/, '$1&')
    return `safe-local://${safePath}`
  })
}
