import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { InventoryPage } from '../Pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import { data } from '../test-data/data';

test('standard_user can complete a purchase end to end', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await test.step('Login', async () => {
    await login.goto();
    await login.login(data.user);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  await test.step('Products: page is loaded', async () => {
    await expect(inventory.title).toHaveText('Products');
  });

  await test.step('Product Details: open product', async () => {
    await inventory.openProduct(data.product);
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(inventory.addToCartButton).toBeVisible(); // details page has rendered
    await expect(inventory.itemName).toHaveText(data.product);
  });

  await test.step('Add to Cart', async () => {
    await inventory.addToCart();
    await expect(inventory.cartBadge).toHaveText('1');
  });

  await test.step('Cart: correct item is present', async () => {
    await inventory.goToCart();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cart.items).toHaveText([data.product]);
  });

  await test.step('Checkout: Your Information', async () => {
    await cart.checkout();
    await expect(checkout.title).toHaveText('Checkout: Your Information');
    await checkout.fillInformation(data.checkoutInfo);
  });

  await test.step('Overview: item is correct before finishing', async () => {
    await expect(checkout.title).toHaveText('Checkout: Overview');
    await expect(checkout.overviewItem).toHaveText(data.product);
  });

  await test.step('Finish and verify order completion', async () => {
    await checkout.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  });
});