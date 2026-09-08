const BASE_URL = 'https://finstack-alpha.vercel.app';

describe('T001: E2E: Login and Add an Expense Transaction', () => {
  it('should login and add a Grocery Shopping expense transaction', async () => {
    // Step 1: Navigate to login page
    await browser.url(`${BASE_URL}/login`);
    await $('#sign_in').waitForDisplayed({ timeout: 30000 });

    // Step 2: Enter email
    await $('#email').setValue('testuser@bstackbank.com');

    // Step 3: Enter password
    await $('#password').setValue('Test@1234');

    // Step 4: Click Sign In and wait for dashboard
    await $('#sign_in').click();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/dashboard'),
      { timeout: 60000, timeoutMsg: 'Dashboard URL not reached within 60s' }
    );
    const greeting = await $('h1*=Good morning');
    await greeting.waitForDisplayed({ timeout: 15000 });

    // Step 5: Click '+ Add Transaction' button — scoped to header area, not dialog
    const addTransactionBtn = await $(
      '//div[contains(@class,"flex") and contains(@class,"gap-3")]//button[normalize-space()="Add Transaction"]'
    );
    await addTransactionBtn.waitForClickable({ timeout: 15000 });
    await addTransactionBtn.click();
    const dialog = await $('[data-slot="dialog-content"]');
    await dialog.waitForDisplayed({ timeout: 15000 });

    // Step 6: Enter amount
    const amountField = await $('#amount');
    await amountField.waitForDisplayed({ timeout: 10000 });
    await amountField.clearValue();
    await amountField.setValue('150.00');

    // Step 7: Enter description
    await $('#description').setValue('Grocery Shopping');

    // Step 8 & 9: Select Category → Food & Dining
    const categoryBtn = await $(
      '//div[contains(@class,"grid") and contains(@class,"gap-2") and .//*[contains(text(),"Category")]]//button[contains(@class,"border-input")]'
    );
    await categoryBtn.waitForClickable({ timeout: 10000 });
    await categoryBtn.click();
    const foodOption = await $('div[role="option"]=Food & Dining');
    await foodOption.waitForClickable({ timeout: 10000 });
    await foodOption.click();

    // Step 10 & 11: Select Account → Main Checking
    const accountBtn = await $(
      '//div[contains(@class,"grid") and contains(@class,"gap-2") and .//*[contains(text(),"Account")]]//button[contains(@class,"border-input")]'
    );
    await accountBtn.waitForClickable({ timeout: 10000 });
    await accountBtn.click();
    const mainCheckingOption = await $('div[role="option"]=Main Checking');
    await mainCheckingOption.waitForClickable({ timeout: 10000 });
    await mainCheckingOption.click();

    // Step 12: Submit the transaction (scoped inside dialog to avoid header button)
    const submitBtn = await $(
      '//*[@data-slot="dialog-content"]//button[normalize-space()="Add Transaction"]'
    );
    await submitBtn.waitForClickable({ timeout: 10000 });
    await browser.execute((el) => el.scrollIntoView(true), submitBtn);
    await submitBtn.click();

    // Step 13: Verify modal closes and dashboard is shown
    await dialog.waitForDisplayed({ timeout: 15000, reverse: true });
    await $('h1*=Good morning').waitForDisplayed({ timeout: 10000 });
  });
});
