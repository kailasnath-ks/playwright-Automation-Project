import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { getCheckoutUsers, getInvalidCheckout } from '../utils/dataLoader';

// Helper: login and add one item to cart
async function loginAndAddItem(page: any) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await page.locator('[data-test="checkout"]').click();
}

test.describe('Checkout - Valid Form @smoke', () => {
  const checkoutUsers = getCheckoutUsers();

  for (const user of checkoutUsers) {
    test(`should complete order for: ${user.scenario}`, async ({ page }) => {
      await loginAndAddItem(page);
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.fillForm(user.firstName, user.lastName, user.zipCode);
      await checkoutPage.continue();
      await checkoutPage.expectTotalVisible();
      await checkoutPage.finish();
      await checkoutPage.expectOrderComplete();
    });
  }
});

test.describe('Checkout - Form Validations @regression', () => {
  const invalidCases = getInvalidCheckout();

  for (const data of invalidCases) {
    test(`should show error for: ${data.scenario}`, async ({ page }) => {
      await loginAndAddItem(page);
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.fillForm(data.firstName, data.lastName, data.zipCode);
      await checkoutPage.continue();
      await checkoutPage.expectError(data.expectedError!);
    });
  }
});

test.describe('Checkout - Cancel Flow @regression', () => {
  test('should cancel checkout and return to cart', async ({ page }) => {
    await loginAndAddItem(page);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart/);
  });

  test('should cancel order overview and return to inventory', async ({ page }) => {
    await loginAndAddItem(page);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillForm('John', 'Doe', '10001');
    await checkoutPage.continue();
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show price total on overview page', async ({ page }) => {
    await loginAndAddItem(page);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillForm('John', 'Doe', '10001');
    await checkoutPage.continue();
    await checkoutPage.expectTotalVisible();
  });
});
