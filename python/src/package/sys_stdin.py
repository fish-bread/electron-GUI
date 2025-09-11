from threading import Thread
from package import print_change
import sys

#定义脚本启动时间
shared_python_time = 3

def sys_stdin():
  global shared_python_time
  try:
    for line in sys.stdin:
      line = line.rstrip()
      try:
        # 尝试将输入转换为整数并更新共享变量
        new_time = int(line)
        shared_python_time = new_time
      except ValueError:
        print_change.print(f"输入不是有效数字: {line}")
  except Exception as e:
    print_change.print(f"读取标准输入时发生错误: {e}")

# 创建并启动线程
input_thread = Thread(target=sys_stdin)
input_thread.daemon = True
input_thread.start()
