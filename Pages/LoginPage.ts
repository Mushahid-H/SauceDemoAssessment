import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(user: { username: string; password: string }) {
    await this.page.getByTestId('username').fill(user.username);
    await this.page.getByTestId('password').fill(user.password);
    await this.page.getByTestId('login-button').click();
  }
}