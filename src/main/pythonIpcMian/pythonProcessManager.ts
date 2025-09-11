//python进程
import { PythonShell } from 'python-shell'
import { ipcMain } from 'electron'
import { pythonPrintFunc } from '../general/allPrint'
import PythonPath from '../pythonIpcMian/python/pythonPath'
import { pythonFilePath } from '../../types/mian'
import { pathDialog } from '../dialog/pythonDialog'
let PyShell: PythonShell | null = null
export const registerPythonIpcHandlers = (): void => {
  // 运行python
  ipcMain.handle('runPython', async (_event, time): Promise<void> => {
    //检测是否存在进程
    if (PyShell) {
      pythonPrintFunc('error', 'python脚本正在执行,请勿重复启动')
      return
    }
    //开始运行python
    //获取python路径
    const pythonScriptPath = PythonPath.getPath()
    if (!pythonScriptPath || !pythonScriptPath.endsWith('.py')) {
      pythonPrintFunc('error', `该路径不是一个有效的python脚本路径`)
      return
    }
    console.log('runPython')
    console.log('Python脚本路径:', pythonScriptPath)
    PyShell = new PythonShell(pythonScriptPath, {
      encoding: 'utf-8',
      pythonOptions: ['-u'] //让打印流直接打印
    })
    //发送消息
    PyShell.send(time)
    //接收消息
    PyShell.on('message', function (message) {
      console.log('监听事件', message)
      pythonPrintFunc('success', message)
    })
    //结束发送以执行python
    PyShell.end((res) => {
      console.log(res)
    })
    //python关闭
    PyShell.on('close', () => {
      pythonPrintFunc('closed', `python脚本正常关闭`)
      PyShell = null
    })
    //python异常报错
    PyShell.on('pythonError', (err) => {
      pythonPrintFunc('error', `python脚本异常关闭,${err}`)
      PyShell = null
    })
    //python报错
    PyShell.on('error', (err) => {
      console.log('python报错', err)
      pythonPrintFunc('error', `python异常报错, ${err}`)
      PyShell = null
    })
  })
  //killPython进程
  ipcMain.on('killPython', (): void => {
    console.log('killPython')
    if (PyShell) {
      PyShell.kill()
      PyShell = null
      pythonPrintFunc('success', 'python脚本已强制终止')
    } else {
      pythonPrintFunc('success', 'python子进程未启动')
    }
  })
  //自定义选择python文件
  ipcMain.handle('choosePython', async (): Promise<pythonFilePath> => {
    try {
      if (PyShell) {
        pythonPrintFunc('error', 'python进程正在执行')
        return {
          canceled: true,
          filePath: ''
        }
      }
      const pathFile = await pathDialog()
      if (pathFile.filePaths[0]) {
        PythonPath.changePath(pathFile.filePaths[0])
      }
      return {
        canceled: pathFile.canceled,
        filePath: pathFile.filePaths[0]
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  })
  //获取python路径
  ipcMain.handle('getPythonPath', async (): Promise<string> => {
    return PythonPath.getPath()
  })
  //还原python路径
  ipcMain.handle('restorePythonPath', async (): Promise<string> => {
    return PythonPath.restorePythonScriptPathFunc()
  })
}
