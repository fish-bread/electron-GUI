import pyautogui
from package import print_change
class WindowsClass:
  @staticmethod
  def windows_func():
    windows_size = pyautogui.size()
    mouse_size = pyautogui.position()
    print_change.print('窗体大小',windows_size)
    print_change.print('鼠标位置' , mouse_size)
    return windows_size, mouse_size
if __name__ == '__main__':
  WindowsClass.windows_func()
