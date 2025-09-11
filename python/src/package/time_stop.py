import time
from package import print_change

def time_run(counter, max_count):
  if isinstance(max_count, str):
    max_count = int(max_count)
  while counter < max_count:
    print_change.print(f" { max_count } 秒后开始运行脚本")
    max_count -= 1
    time.sleep(1)

if __name__ == '__main__':
  time_run(0, 5)
