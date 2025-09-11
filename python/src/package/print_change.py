import functools
import sys

sys.stdout.reconfigure(encoding='utf-8')
print = functools.partial(print, flush=True)
