import { Page, Locator } from '@playwright/test';

export class CartPage {
  // Verified against the cart DOM
  readonly cartList: Locator;
  readonly checkoutButton: Locator;
  readonly continueShopping: Locator;

  // Not verified: cart was empty in the pasted DOM
  readonly items: Locator;

  constructor(page: Page) {
    this.cartList = page.getByTestId('cart-list');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShopping = page.getByTestId('continue-shopping');

    this.items = this.cartList.getByTestId('inventory-item-name');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}