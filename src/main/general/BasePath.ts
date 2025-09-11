class BasePathManager {
  protected currentPath: string = ''
  // 改变路径
  changePath(filePath: string): void {
    this.currentPath = filePath
    console.log('当前改变路径', this.currentPath)
  }
  // 返回当前路径
  getPath(): string {
    console.log('当前获取路径', this.currentPath)
    return this.currentPath
  }
  // 一个更通用的路径重置方法，可选
  restorePath(defaultPath: string): string {
    this.currentPath = defaultPath
    return this.currentPath
  }
}
export default BasePathManager
