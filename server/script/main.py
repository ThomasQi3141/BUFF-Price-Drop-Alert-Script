from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

from csv import DictReader
from subprocess import call
import time

# Chromedriver initialization
options = webdriver.ChromeOptions()
options.add_argument('--headless')
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Webpage instance initialization
driver.get("https://buff.163.com")
driver.maximize_window()

# Retriving cookies
def get_cookies_values(file):
    with open(file, encoding="utf-8-sig") as f:
        dict_reader = DictReader(f)
        list_of_dicts = list(dict_reader)
    return list_of_dicts

cookies = get_cookies_values("buff_cookies.csv")

# Adding cookies onto webpage instance
for i in cookies:
    driver.add_cookie(i)

driver.refresh()

# Opens up market page
WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/ul/li[2]/a"))
)
driver.find_element(By.XPATH, "/html/body/div[1]/div/div[2]/ul/li[2]/a").click()


# Method to get the current price 
def check_item(item):
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[@id=\"j_search\"]/span/input"))
    )
    driver.find_element(By.XPATH, "//*[@id=\"j_search\"]/span/input").send_keys(item)
    
    time.sleep(1)

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[@id=\"search_btn_csgo\"]"))
    )
    driver.find_element(By.XPATH, "//*[@id=\"search_btn_csgo\"]").click()

    time.sleep(2)

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, '//a[@title=\"' + item + '\"]'))
    )
    driver.find_element(By.XPATH, '//a[@title=\"' + item + '\"]').click()
    
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//div[@style='display: table-cell; white-space: nowrap;']"))
    )
    cur_price = float(driver.find_element(By.XPATH, "//div[@style='display: table-cell; white-space: nowrap;']").text.split(" ")[1])
    
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/ul/li[2]/a"))
    )
    driver.find_element(By.XPATH, "/html/body/div[1]/div/div[2]/ul/li[2]/a").click()
    
    return cur_price

# Retrieves items and desired prices from items.txt
items = []

with open("items.txt", "r") as f:
    while True:
        temp = f.readline()
        if temp == "":
            break
        else:
            items.append(temp.split(":")[0][:-1])

# Checks the price of each item
list_of_cur_price = []
for i in range(len(items)):
    current_price = check_item(items[i])
    list_of_cur_price.append(current_price)    

# Generates data table in extracted_data.txt
with open("extracted_data.txt", "w") as f:
    for i in range(len(list_of_cur_price)):
        f.write(items[i])
        f.write(":" + str(list_of_cur_price[i]) + "\n")
