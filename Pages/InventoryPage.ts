import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  // Verified against the products list DOM
  readonly itemName: Locator;

  // Not in the pasted DOM: confirm against the header and Product Details page
  readonly title: Locator;
  readonly addToCartButton: Locator; // Product Details page only
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private page: Page) {
    this.itemName = page.getByTestId('inventory-item-name');

    this.title = page.getByTestId('title');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  // Products list: click the product name inside its link
  async openProduct(name: string) {
    await this.itemName.filter({ hasText: name }).click();
  }

  // Product Details page: single "Add to cart" button
  async addToCart() {
    await this.addToCartButton.click();
  }

  // Products list: per-product button, e.g. slug = 'sauce-labs-backpack' (verified)
  async addToCartFromList(slug: string) {
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}