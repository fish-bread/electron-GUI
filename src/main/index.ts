import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon3.png?asset'
import { getLock } from './func/gotTheLock'
import { registerPythonIpcHandlers } from './pythonIpcMian/pythonProcessManager'
import { registerPixivPuppeteerIpcHandlers } from './puppeteerIpcMain/puppeteerPixivProcessManager'
import { registerCustomPythonIpcHandlers } from './pythonIpcMian/pythonCustomManager'
import { allSettingManager } from './manager/allSettingManager'
// 检测并阻止多实例
getLock()
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 830,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden', //删除自定义
    ...(process.platform === 'linux' ? { icon } : { icon }), //图标
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  console.log('窗体id', mainWindow.id)
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

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
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
