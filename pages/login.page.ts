import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameField = this.page.getByRole('textbox', { name: 'Username' });
  readonly passwordField = this.page.getByRole('textbox', { name: 'Password' });
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async expectVisible() {
    await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  }
}