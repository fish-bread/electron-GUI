import { app, BrowserWindow } from 'electron'

export const getLock = (): void => {
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    // 如果获取锁失败，说明已经有实例在运行，直接退出
    app.quit()
  } else {
    // 如果获取锁成功，继续启动应用
    app.on('second-instance', () => {
      // 当第二个实例启动时，聚焦到第一个实例的窗口
      const windows = BrowserWindow.getAllWindows()
      if (windows.length > 0) {
        const mainWindow = windows[0]
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }
}
