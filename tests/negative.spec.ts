import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { getNegativeInputs } from '../utils/dataLoader';

test.describe('Negative - Security Inputs @regression', () => {
  const negativeInputs = getNegativeInputs();

  for (const input of negativeInputs) {
    test(`should reject: ${input.scenario}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(input.username, input.password);
      await loginPage.expectErrorMessage(input.expectedError);
    });
  }
});

test.describe('Negative - Cart @regression', () => {
  test('should remove item from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);
    // Remove item
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await inventoryPage.expectCartCount(0);
  });

  test('should show empty cart after removing all items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test('should continue shopping from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/inventory/);
  });
});

test.describe('Negative - Login Edge Cases @regression', () => {
  test('should show error for password only', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');
    await loginPage.expectErrorMessage('Epic sadface: Username is required');
  });

  test('should show error for username only', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', '');
    await loginPage.expectErrorMessage('Epic sadface: Password is required');
  });
});
