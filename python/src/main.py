import os

from package import print_change
from package import time_stop
from package import sys_stdin

print_change.print("当前工作目录:", os.getcwd())

from worker import new
#from package import windows
#获取窗体
#windows.WindowsClass.windows_func()
#暂停脚本
time_stop.time_run(0, sys_stdin.shared_python_time)
#运行脚本
new.Aop.run()
