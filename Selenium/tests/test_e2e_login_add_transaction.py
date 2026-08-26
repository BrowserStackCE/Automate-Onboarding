import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://finstack-alpha.vercel.app"


def test_e2e_login_and_add_expense_transaction(driver):
    """T001: E2E: Login and Add an Expense Transaction"""

    wait = WebDriverWait(driver, 30)

    # Step 1: Navigate to login page
    driver.get(f"{BASE_URL}/login")
    wait.until(EC.visibility_of_element_located((By.ID, "sign_in")))

    # Step 2: Enter email
    driver.find_element(By.ID, "email").send_keys("testuser@bstackbank.com")

    # Step 3: Enter password
    driver.find_element(By.ID, "password").send_keys("Test@1234")

    # Step 4: Click Sign In and wait for dashboard
    driver.find_element(By.ID, "sign_in").click()
    wait.until(EC.url_contains("/dashboard"))
    wait.until(EC.visibility_of_element_located(
        (By.XPATH, "//h1[contains(text(), 'Good morning')]")
    ))

    # Step 5: Click '+ Add Transaction' button
    add_btn = wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//button[normalize-space()='Add Transaction']")
    ))
    add_btn.click()
    wait.until(EC.visibility_of_element_located(
        (By.CSS_SELECTOR, "[data-slot='dialog-content']")
    ))

    # Step 6: Enter amount
    amount_field = wait.until(EC.visibility_of_element_located((By.ID, "amount")))
    amount_field.clear()
    amount_field.send_keys("150.00")

    # Step 7: Enter description
    driver.find_element(By.ID, "description").send_keys("Grocery Shopping")

    # Step 8 & 9: Select Category → Food & Dining
    category_btn = driver.find_element(
        By.XPATH,
        "//div[contains(@class,'grid') and contains(@class,'gap-2') and .//text()[contains(.,'Category')]]//button[contains(@class,'border-input')]"
    )
    category_btn.click()
    wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//div[@role='option' and normalize-space()='Food & Dining']")
    )).click()

    # Step 10 & 11: Select Account → Main Checking
    account_btn = driver.find_element(
        By.XPATH,
        "//div[contains(@class,'grid') and contains(@class,'gap-2') and .//text()[contains(.,'Account')]]//button[contains(@class,'border-input')]"
    )
    account_btn.click()
    wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//div[@role='option' and normalize-space()='Main Checking']")
    )).click()

    # Step 12: Submit the transaction — scoped inside the dialog to avoid matching the header button
    submit_btn = wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//*[@data-slot='dialog-content']//button[normalize-space()='Add Transaction']")
    ))
    driver.execute_script("arguments[0].scrollIntoView(true);", submit_btn)
    driver.execute_script("arguments[0].click();", submit_btn)

    # Step 13: Verify modal closes and dashboard is shown
    wait.until(EC.invisibility_of_element_located(
        (By.CSS_SELECTOR, "[data-slot='dialog-content']")
    ))
    wait.until(EC.visibility_of_element_located(
        (By.XPATH, "//h1[contains(text(), 'Good morning')]")
    ))
