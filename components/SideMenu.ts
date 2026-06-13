import type { Locator, Page } from '@playwright/test';

export class SideMenu {
  private readonly claimLink: Locator;

  constructor(private readonly page: Page) {
    this.claimLink = this.page.getByRole('link', { name: 'Claim' });
  }

  async openClaimModule() {
    await this.claimLink.click();
  }
}