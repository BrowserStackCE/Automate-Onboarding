import { test, expect } from '@playwright/test';

test('T001: E2E: Login and Add an Expense Transaction', async ({ page }) => {
  // Step 1: Navigate to login page
  await page.goto('https://finstack-alpha.vercel.app/login');
  await expect(page.locator('#sign_in')).toBeVisible();

  // Step 2: Enter email
  await page.locator('#email').fill('testuser@bstackbank.com');

  // Step 3: Enter password
  await page.locator('#password').fill('Test@1234');

  // Step 4: Click Sign In and wait for dashboard
  await page.locator('#sign_in').click();
  await page.waitForURL('**/dashboard', { timeout: 30000 });
  await expect(page.locator('h1').filter({ hasText: 'Good morning' })).toBeVisible();

  // Step 5: Click '+ Add Transaction' button
  await page.locator('div.flex.gap-3').filter({ hasText: 'Add Transaction' }).getByRole('button', { name: 'Add Transaction' }).click();
  await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();

  // Step 6: Enter amount
  await page.locator('#amount').fill('150.00');

  // Step 7: Enter description
  await page.locator('#description').fill('Grocery Shopping');

  // Step 8 & 9: Select Category → Food & Dining
  await page.locator('div.grid.gap-2').filter({ hasText: 'Category' }).locator('button.border-input.flex.w-full').click();
  await page.getByRole('option', { name: 'Food & Dining' }).click();

  // Step 10 & 11: Select Account → Main Checking
  await page.locator('div.grid.gap-2').filter({ hasText: 'Account' }).locator('button.border-input.flex.w-full').click();
  await page.getByRole('option', { name: 'Main Checking' }).click();

  // Step 12: Submit the transaction
  await page.getByRole('button', { name: 'Add Transaction' }).click();

  // Step 13: Verify modal closes and dashboard is shown
  await expect(page.locator('[data-slot="dialog-content"]')).toBeHidden({ timeout: 15000 });
  await expect(page.locator('h1').filter({ hasText: 'Good morning' })).toBeVisible();
});
