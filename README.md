# electron-GUI@v0.2.1
尚未完工
这是尝试用electron制作pythonGUI和jsGUI的项目,如果你不在乎性能可以尝试一下,基于electron-vite + python-shell + puppeteer
# 目前实现的功能
1. 可以完整的通过puppeteer爬取pixiv图片,并根据图片名字保存图片,最多支持5个并发下载(多了怕被封)
2. 可以完整的通过puppeteer爬取bilibili视频,并根据视频标题保存视频,并使用ffmpeg合并视频(未内置ffmpeg)
3. 支持全局网络代理,防止下载外网资源失败(当然网络不好另算)
4. 比较好的支持一个python脚本与一个js脚本同时运行,多python与多js脚本运行会导致管理混乱,控制台打印混乱,正在思考优化
5. 内置仿写qq的浏览器窗体,应用支持识别http前缀文本为超链接并使用自定义浏览器窗体打开
6. 预备添加工具类,添加处理图片的工具
# 正在施工的功能
1. 优化界面ui
2. 添加新功能
3. 更新python相关功能
4. 更新puppeteer脚本相关内容
5. 优化多脚本切换功能
6. 实现多个脚本同时运行
