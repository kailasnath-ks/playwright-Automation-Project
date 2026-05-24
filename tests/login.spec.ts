import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getValidUsers, getInvalidUsers } from '../utils/dataLoader';

test.describe('Login - Valid Users @smoke', () => {
  const validUsers = getValidUsers();

  for (const user of validUsers) {
    test(`should login successfully as ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
      await loginPage.expectLoginSuccess();
      await expect(page).toHaveTitle(user.expectedTitle ?? 'Swag Labs');
    });
  }
});

test.describe('Login - Invalid Users @regression', () => {
  const invalidUsers = getInvalidUsers();

  for (const user of invalidUsers) {
    const label = user.username || '(empty credentials)';
    test(`should show error for: ${label}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
      await loginPage.expectErrorMessage(user.expectedError!);
    });
  }
});

test.describe('Login - Navigation @smoke', () => {
  test('page title should be correct', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('login form elements should be visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

   
  });
});
test('debug practice test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('standard_user', 'secret_sauce')
  await expect(page).toHaveTitle('Wrong Title') // intentionally wrong
})