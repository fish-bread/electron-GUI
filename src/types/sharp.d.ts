export interface SharpInter {
  fileData: SharpFileInter[] | null
  success: boolean
}
export interface SharpFileInter {
  size: string
  filePath: string | null
}
export interface sharpDialogInter {
  canceled: boolean
  fileData: SharpFileInter[] | null
}
export interface showImgInter {
  fileData: SharpFileInter | null
  imgPath: string
}
