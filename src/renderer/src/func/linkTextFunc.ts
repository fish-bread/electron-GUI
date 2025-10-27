//转化文本为a标签
export const formatMessageWithLinks = (text: string): string => {
  if (!text) return ''

  // 改进的正则表达式，更好地处理中文分隔符
  const urlRegex = /(https?:\/\/|www\.)[^\s<>&()'"\u4e00-\u9fa5，,。！？；：”“‘’（）【】]+/g

  // 替换匹配到的URL为<a>标签
  return text.replace(urlRegex, (url) => {
    // 清理URL末尾可能的中文标点或无效字符
    const cleanUrl = url.replace(/[，,。！？；：”“‘’（）【】]+$/, '')

    // 处理以 'www.' 开头的URL，为其添加 'https://'
    let href = cleanUrl
    if (cleanUrl.startsWith('www.')) {
      href = 'https://' + cleanUrl
    }

    // 返回构建的<a>标签
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>`
  })
}
