import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { getLock } from './func/gotTheLock'
import { registerPythonIpcHandlers, PyShell } from './pythonIpcMian/pythonProcessManager'
import { registerPixivPuppeteerIpcHandlers } from './puppeteerIpcMain/puppeteerPixivProcessManager'
import { registerCustomPythonIpcHandlers } from './pythonIpcMian/pythonCustomManager'
import { allSettingManager } from './manager/allSettingManager'
import { registerBilibiliPuppeteerIpcHandlers } from './puppeteerIpcMain/puppeteerBilibiliProcessManager'
import { createWindow } from './window/mainWindow'
import BilibiliCore from './puppeteerIpcMain/puppeteer/bilibili/bilibiliCore'
import PuppeteerCore from './puppeteerIpcMain/puppeteer/pixiv/pixivCore'
import { registerChromeIpcHandlers } from './chromeIpcMain/chromeManager'
// 检测并阻止多实例
getLock()
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC 中间件
  //airtest的ipc函数
  registerPythonIpcHandlers()
  //python自定义ipc函数
  registerCustomPythonIpcHandlers()
  //puppeteer的pixiv
  registerPixivPuppeteerIpcHandlers()
  //puppeteer的bilibili
  registerBilibiliPuppeteerIpcHandlers()
  //chrome的ipc
  registerChromeIpcHandlers()
  //全局设置获取
  allSettingManager()
  //最大化或恢复窗体
  ipcMain.on('maxSizeFunc', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
      if (win && win.isMaximized()) win.unmaximize()
      else win.maximize()
    }
  })
  //最小化
  ipcMain.on('minimizeFunc', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) win.minimize()
  })
  //关闭
  ipcMain.on('closeWindowFunc', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) win.close()
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    PyShell?.kill()
    await BilibiliCore.killPuppeteer()
    await PuppeteerCore.killPuppeteer()
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
