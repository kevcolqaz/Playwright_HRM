import { expect, type Page } from '@playwright/test';
import type { Locator } from '@playwright/test';

export class Footer {
  private readonly footerText: Locator;

  constructor(private readonly page: Page) {
    this.footerText = this.page.getByText('OrangeHRM OS 5.8', { exact: false });
  }

  async expectVisible() {
    await expect(this.footerText).toBeVisible();
  }
}