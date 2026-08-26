import os
import pytest
from selenium import webdriver


@pytest.fixture(scope="function")
def driver():
    """WebDriver fixture.

    Always creates a local webdriver.Chrome — the BrowserStack SDK intercepts
    this call and redirects it to the BrowserStack hub when the test is run via
    `browserstack-sdk pytest …` (i.e. when BROWSERSTACK_AUTOMATION=true).
    For plain local runs, Chrome is used directly without any interception.
    """
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()
