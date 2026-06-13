import { expect, type Page } from '@playwright/test';

export class Header {
  constructor(private readonly page: Page) {}

  async expectModuleTitle(title: string) {
    await expect(this.page.getByRole('heading', { level: 6, name: title })).toBeVisible();
  }

  async expectDashboard() {
    await this.expectModuleTitle('Dashboard');
  }

  async expectClaim() {
    await this.expectModuleTitle('Claim');
  }
}