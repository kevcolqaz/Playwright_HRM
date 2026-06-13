import { expect, type Page } from '@playwright/test';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SideMenu } from '../components/SideMenu';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly header = new Header(this.page);
  readonly sideMenu = new SideMenu(this.page);
  readonly footer = new Footer(this.page);
  readonly assignClaimButton = this.page.getByRole('button', { name: 'Assign Claim' });

  constructor(page: Page) {
    super(page);
  }

  async expectVisible() {
    await this.header.expectDashboard();
    await this.footer.expectVisible();
  }

  async openAssignClaim() {
    await this.sideMenu.openClaimModule();
    await this.assignClaimButton.click();
  }
}