import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page           = page;
    this.productTitle   = page.locator('.inventory_details_name');
    this.productPrice   = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.backButton     = page.locator('[data-test="back-to-products"]');
  }

  async expectTitle(name: string) {
    await expect(this.productTitle).toHaveText(name);
  }

  async expectPrice(price: string) {
    await expect(this.productPrice).toHaveText(price);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goBack() {
    await this.backButton.click();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }
}
