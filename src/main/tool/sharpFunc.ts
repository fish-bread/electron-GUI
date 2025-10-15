import fs from 'fs'
import { Stats } from 'fs'
import { SharpFileInter } from '../../types/sharp'
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
