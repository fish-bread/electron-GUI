import fs from 'fs'
import { Stats } from 'fs'
import { SharpFileInter } from '../../types/sharp'
export interface exportLeave {
  pngLeave: number
  jpgLeave: number
}
//返回数组文件数据
export const fileData = (filePath: string[]): Stats[] | null => {
  if (filePath.length > 0) {
    const statsList: Stats[] = []
    for (let i = 0; i < filePath.length; i++) {
      statsList.push(fs.statSync(filePath[i]))
    }
    return statsList
  } else {
    return null
  }
}
//返回修改后的state的size
export const formatSize = (state: Stats[], pathFile: string[]): SharpFileInter[] => {
  return state.map((stats, index) => ({
    filePath: pathFile[index],
    size: `${(stats.size / 1024 / 1024).toFixed(2)}Mb`
  }))
}
//处理图片质量等级
export const qualityLeaveFunc = (qualityLeave: number): exportLeave => {
  const pngLeave = Math.round(9 - (qualityLeave / 100) * 9)
  if (qualityLeave === 0) {
    qualityLeave = 1
  }
  return {
    pngLeave: Math.max(0, Math.min(9, pngLeave)),
    jpgLeave: qualityLeave
  }
}
