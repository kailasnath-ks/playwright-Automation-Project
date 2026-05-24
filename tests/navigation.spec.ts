import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductPage } from '../pages/ProductPage';
import { getProducts } from '../utils/dataLoader';

async function loginAsStandard(page: any) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
}

test.describe('Navigation - Product Detail @smoke', () => {
  const products = getProducts();

  for (const product of products) {
    test(`should open product detail for: ${product.name}`, async ({ page }) => {
      await loginAsStandard(page);
      await page.locator('.inventory_item_name', { hasText: product.name }).click();
      const productPage = new ProductPage(page);
      await productPage.expectTitle(product.name);
      await productPage.expectPrice(product.expectedPrice);
    });
  }
});

test.describe('Navigation - Back Button @regression', () => {
  test('should go back to inventory from product detail', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('.inventory_item_name').first().click();
    const productPage = new ProductPage(page);
    await productPage.goBack();
  });

  test('should add item to cart from product detail page', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' }).click();
    const productPage = new ProductPage(page);
    await productPage.addToCart();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});

test.describe('Navigation - Logout @smoke', () => {
  test('should logout successfully', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('should not access inventory after logout', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/\/$/);
  });

  test('should open and close burger menu', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('#react-burger-menu-btn').click();
    await expect(page.locator('.bm-menu-wrap')).toBeVisible();
    await page.locator('#react-burger-cross-btn').click();
    await expect(page.locator('.bm-menu-wrap')).not.toBeVisible();
  });
});
