import os
#获取图片路径
class ImagePathClass:
  @staticmethod
  def image_path_func(path,image_name):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    button_image_path = os.path.join(script_dir,f'{path}', 'public', f'{image_name}')
    return button_image_path
