export const HandleRu34Tabs = (tabs: string): string => {
  console.log('修改前', tabs)
  console.log('修改后', tabs.replace(/ /g, '+'))
  return tabs.replace(/ /g, '+')
}
export const SearchRu34Tabs = (tabs: string): string => {
  //查找最后一个空格的位置
  const lastSpaceIndex = tabs.lastIndexOf(' ')
  //如果找到了空格，则截取空格后的部分；否则返回原字符串
  if (lastSpaceIndex !== -1) {
    return tabs.substring(lastSpaceIndex + 1)
  }
  return tabs
}
