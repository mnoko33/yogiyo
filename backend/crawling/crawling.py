import requests
from bs4 import BeautifulSoup  # pip install bs4
from selenium import webdriver  # pip install selenium
import time
from collections import deque

options = webdriver.ChromeOptions()
# options.add_argument('headless')
options.add_argument('window-size=1920x1080')
# options.add_argument('disable-gpu')

driver = webdriver.Chrome('./chromedriver.exe', chrome_options=options)
# url = "https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/";
# driver.get(url)
# time.sleep(1)
# driver.find_element_by_class_name('category-title').click()
# time.sleep(1)
# Q = deque()


driver.get('https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/314455/')

j = 0
y = 0
# for i in range(2, 1897):
#     print('###########',i, j)
#     target = f'//*[@id="content"]/div/div[4]/div[{i}]'
#     driver.find_element_by_xpath(target).click()
#     time.sleep(0.5)
#     driver.back()
#     time.sleep(0.5)
#     j += 1
#     if j == 10:
#         j == 0
#         y += 700
#         sc = f'window.scrollTo(0, {y})'
#         driver.execute_script(sc)

    # try:
    #     el = driver.find_element_by_xpath(target)
    #     el.click()
    #     time.sleep(0.5)
    #     driver.back()
    #     time.sleep(0.5)
    # except:
    #     driver.execute_script("window.scrollTo(0, 1000)")
    #     time.sleep(0.5)
    #     el = driver.find_element_by_xpath(target)
    #     el.click()
    #     time.sleep(0.5)
    #     driver.back()
    #     time.sleep(0.5)

