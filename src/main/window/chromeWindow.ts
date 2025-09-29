import { BrowserWindow, shell, WebContentsView, ipcMain } from 'electron'
import icon from '../../../resources/icon3.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
export const createChromeWindow = (href: string): void => {
  const chromeWindow = new BrowserWindow({
    width: 1280,
    height: 830,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webgl: true
    }
  })

  console.log('窗体id', chromeWindow.id)

  // 添加 WebContentsView
  const view = new WebContentsView()
  chromeWindow.contentView.addChildView(view)

  // 更新视图边界函数
  const updateViewBounds = (): void => {
    const bounds = chromeWindow.getBounds()
    view.setBounds({
      x: 0,
      y: 40,
      width: bounds.width,
      height: bounds.height - 40
    })
  }

  // 设置事件监听器
  const setupEventListeners = (): void => {
    chromeWindow.on('ready-to-show', () => {
      chromeWindow.show()
    })
    chromeWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
    // 分别为每个事件添加监听器，避免类型错误
    chromeWindow.on('resize', updateViewBounds)
    chromeWindow.on('move', updateViewBounds)
    chromeWindow.on('maximize', updateViewBounds)
    chromeWindow.on('unmaximize', updateViewBounds)
    chromeWindow.on('enter-full-screen', updateViewBounds)
    chromeWindow.on('leave-full-screen', updateViewBounds)
  }
  //监听标题变化
  view.webContents.on('page-title-updated', (_event, title) => {
    console.log('页面标题更新为:', title)
    const allWindows = BrowserWindow.getAllWindows()
    const targetWindow = allWindows.find((win) => win.id === 2)
    if (targetWindow) {
      targetWindow.webContents.send('page-title-updated', title)
    }
  })
  //监听页面加载完毕
  view.webContents.on('did-finish-load', () => {
    console.log('页面已经完全加载完毕')
    const targetWindow = getWindow()
    if (targetWindow) {
      targetWindow.webContents.send('page-reloaded', true)
    }
  })
  //监听 WebContentsView 中的导航事件
  view.webContents.on('did-navigate-in-page', (_event, navigationUrl) => {
    console.log('监听导航', navigationUrl)
    isGoBack(view)
  })
  //处理 WebContentsView 中新开页面的链接，并在当前 view 中加载
  view.webContents.setWindowOpenHandler((details) => {
    console.log('新页面导航')
    // 在当前 WebContentsView 中加载目标 URL
    view.webContents.loadURL(details.url)
    isGoBack(view)
    // 拒绝创建新窗口或新标签页
    return { action: 'deny' }
  })
  //返回上一个
  ipcMain.on('nav-go-back', (): void => {
    view.webContents.navigationHistory.goBack()
    isGoBack(view)
  })
  //返回下一个
  ipcMain.on('nav-go-forward', (): void => {
    view.webContents.navigationHistory.goForward()
    isGoBack(view)
  })
  //刷新页面
  ipcMain.on('nav-reload', () => {
    console.log('刷新页面')
    view.webContents.reloadIgnoringCache()
    const targetWindow = getWindow()
    if (targetWindow) {
      targetWindow.webContents.send('page-reloaded', false)
    }
  })
  // 初始化
  updateViewBounds()
  view.webContents.loadURL(href)
  setupEventListeners()

  // 加载页面
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    chromeWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/chrome`)
  } else {
    chromeWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '#/chrome'
    })
  }
}
//获取窗体
const getWindow = (): Electron.BrowserWindow | undefined => {
  const allWindows = BrowserWindow.getAllWindows()
  return allWindows.find((win) => win.id === 2)
}
//获取是否可以返回或前进
const isGoBack = (view: WebContentsView): void => {
  const targetWindow = getWindow()
  if (targetWindow) {
    targetWindow.webContents.send('page-is-go', {
      isGOBack: view.webContents.navigationHistory.canGoBack(),
      isGoForward: view.webContents.navigationHistory.canGoForward()
    })
  }
}
