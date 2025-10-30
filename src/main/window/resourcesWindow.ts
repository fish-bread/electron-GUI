import { BrowserWindow, shell } from 'electron'
import icon from '../../../resources/icon3.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { changeChromeId, chromeId, createNewChromeWindow } from '../chromeIpcMain/chrome/chromeFunc'
import { getWindow } from '../func/windowFunc'
import { sendPost } from '../../types/ru34'
export const createResourcesWindow = (filePath: sendPost): void => {
  const resourcesWindow = new BrowserWindow({
    width: 1280,
    height: 830,
    minWidth: 480,
    minHeight: 480,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden', //删除自定义
    ...(process.platform === 'linux' ? { icon } : { icon }), //图标
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  console.log('窗体id', resourcesWindow.id)
  resourcesWindow.on('ready-to-show', () => {
    resourcesWindow.show()
    //发送数据到窗体
    changeChromeId(1)
    const targetWindow = getWindow(chromeId - 1)
    console.log('路径', filePath, targetWindow?.id)
    if (targetWindow) {
      targetWindow.webContents.send('resources-path', filePath)
    }
  })

  resourcesWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    event.preventDefault()
    createNewChromeWindow(navigationUrl)
    console.log('拦截到导航跳转至: ', navigationUrl)
  })

  resourcesWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    resourcesWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/resources`)
  } else {
    resourcesWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '#/resources'
    })
  }
}
