from selenium import webdriver
from selenium.webdriver.common.by import By
import boto3

url = "https://image.tmdb.org/t/p/w500/nDCN5WubZtnrUy5B1q67xde4wQI.jpg"
driver = webdriver.Chrome()
driver.get(url)
with open("./media/movie/test.jpg", "wb") as f:
    f.write(driver.find_element(By.XPATH, "/html/body/img").screenshot_as_png)
    f.close()

driver.quit()
with open("./media/movie/test.jpg", "rb") as f:
    print(f.read())
    f.close()

