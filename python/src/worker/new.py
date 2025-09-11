import os
import time
import pyautogui
from package import image_path
from package import print_change
class Aop:
  @staticmethod
  def run():
    max_attempts = 10
    attempt = 0

    while attempt < max_attempts:
      try:
        button_image_path = image_path.ImagePathClass.image_path_func( '../..', '1.png')
        button_center = pyautogui.locateCenterOnScreen(button_image_path, confidence=0.8)
        if button_center:
          pyautogui.doubleClick(button_center.x, button_center.y)
          print_change.print("成功点击按钮！")
          attempt = 0
          break
        else:
          print_change.print(f"第 {attempt+1} 次尝试未找到按钮，2秒后重试...")
          attempt += 1
          time.sleep(0.5)
      except Exception as e:
        print_change.print(f"查找过程中出现错误: {e}, 未找到当前按钮")
        attempt += 1
        time.sleep(0.5)
      else:
        print_change.print("已达到最大尝试次数，未找到按钮")
    while attempt < max_attempts:
      try:
        button_image_path = image_path.ImagePathClass.image_path_func('../..' ,'5.png')
        button_center = pyautogui.locateCenterOnScreen(button_image_path, confidence=0.5)
        if button_center:
          pyautogui.click(button_center.x, button_center.y)
          print_change.print("成功点击按钮2_1！")
          attempt = 0
          pyautogui.write('https://www.pixiv.net/')
          pyautogui.press('enter')
          pyautogui.press('enter')
          break
        else:
          print_change.print(f"第 {attempt+1} 次尝试未找到按钮，2秒后重试...")
          attempt += 1
          time.sleep(0.5)
      except Exception as e:
        print_change.print(f"查找过程中出现错误: {e}, 未找到当前按钮")
        attempt += 1
        time.sleep(0.5)
      else:
        print_change.print("已达到最大尝试次数，未找到按钮")
if __name__ == '__main__':
  Aop.run()
