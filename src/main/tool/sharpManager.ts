import { ipcMain } from 'electron'
import sharp from 'sharp'
import path from 'path'
import { sharpDialogInter, SharpFileInter, SharpInter } from '../../types/sharp'
import { fileData, formatSize } from './sharpFunc'
import { pathsDialog } from '../dialog/filesDialog'
import { Stats } from 'fs'
export const sharpIpcHandlers = (): void => {
  //返回文件路径级原文件大小
  ipcMain.handle('sharp-image', async (): Promise<sharpDialogInter> => {
    try {
      const pathFile = await pathsDialog()
      //选择文件
      if (!pathFile.canceled) {
        //读取原文件
        const stats = fileData(pathFile.filePaths)
        if (stats) {
          console.log('Size:', stats)
          //返回对应值
          const fileSize = formatSize(stats, pathFile.filePaths)
          return {
            canceled: pathFile.canceled,
            fileData: fileSize
          }
        } else {
          return {
            canceled: true,
            fileData: null
          }
        }
      }
      //未选择文件
      return {
        canceled: pathFile.canceled,
        fileData: null
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  })
  //处理文件
  ipcMain.handle('sharp-image-change', async (_event, filePath: string[]): Promise<SharpInter> => {
    try {
      console.log('sharp-image-change', filePath)
      const outputPath: string[] = []
      let stats: Stats[] | null = null
      let fileSize: SharpFileInter[] = []
      for (let i = 0; i < filePath.length; i++) {
        //使用path模块解析路径
        const parsedPath = path.parse(filePath[i])
        //构建新文件名（原文件名 + _sharp + .png）
        const newFileName = `${parsedPath.name}_sharp.png`
        //组合完整输出路径（保持原目录）
        outputPath.push(path.join(parsedPath.dir, newFileName))
        await sharp(filePath[i]).png().toFile(outputPath[i])
        //读取后文件
        stats = fileData(outputPath)
        console.log('Size:', stats)
        //返回相应的值
        if (stats) {
          fileSize = formatSize(stats, outputPath)
        }
      }
      if (stats) {
        return {
          fileData: fileSize,
          success: true
        }
      } else {
        return {
          fileData: null,
          success: false
        }
      }
    } catch (e) {
      console.error(e)
      return {
        fileData: null,
        success: false
      }
    }
  })
}
