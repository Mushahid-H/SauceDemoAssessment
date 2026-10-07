import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly title: Locator;
  readonly overviewItem: Locator;
  readonly completeHeader: Locator;

  constructor(private page: Page) {
    this.title = page.getByTestId('title');
    this.overviewItem = page.getByTestId('inventory-item-name');
    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillInformation(info: { firstName: string; lastName: string; postalCode: string }) {
    await this.page.getByTestId('firstName').fill(info.firstName);
    await this.page.getByTestId('lastName').fill(info.lastName);
    await this.page.getByTestId('postalCode').fill(info.postalCode);
    await this.page.getByTestId('continue').click();
  }

  async finish() {
    await this.page.getByTestId('finish').click();
  }
}