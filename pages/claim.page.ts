import { expect, type Page } from '@playwright/test';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { BasePage } from './base.page';

export type ClaimAssignment = {
  employeeName: string;
  employeeFallbacks?: string[];
  eventName: string;
  currency: string;
  remarks: string;
};

export class ClaimPage extends BasePage {
  readonly header = new Header(this.page);
  readonly footer = new Footer(this.page);
  readonly employeeField = this.page.getByRole('textbox', { name: 'Type for hints...' });
  readonly createButton = this.page.getByRole('button', { name: 'Create' });
  readonly dropdownWrappers = this.page.locator('.oxd-select-wrapper');

  constructor(page: Page) {
    super(page);
  }

  async expectCreateFormVisible() {
    await this.header.expectModuleTitle('Create Claim Request');
  }

  async fillClaimRequest(claimAssignment: ClaimAssignment) {
    await this.selectEmployee(claimAssignment.employeeName, claimAssignment.employeeFallbacks ?? []);

    await this.selectDropdownOption(0, claimAssignment.eventName);
    await this.selectDropdownOption(1, claimAssignment.currency);

    await this.page.locator('textarea').fill(claimAssignment.remarks);
  }

  async createClaim() {
    await this.createButton.click();
  }

  async expectAssignedClaim(claimAssignment: ClaimAssignment) {
    await this.header.expectClaim();
    await expect(this.page.locator('input:not([type="checkbox"])').nth(1)).toHaveValue(claimAssignment.employeeName);
    await expect(this.page.locator('input:not([type="checkbox"])').nth(3)).toHaveValue(claimAssignment.eventName);
    await expect(this.page.locator('input:not([type="checkbox"])').nth(5)).toHaveValue(claimAssignment.currency);
    await expect(this.page.locator('textarea')).toHaveValue(claimAssignment.remarks);
    await this.footer.expectVisible();
  }

  private async selectDropdownOption(dropdownIndex: number, optionName: string) {
    await this.dropdownWrappers.nth(dropdownIndex).click();
    await this.page.getByRole('option', { name: optionName }).click();
  }

  private async selectEmployee(primaryEmployee: string, fallbackEmployees: string[]) {
    for (const candidate of [primaryEmployee, ...fallbackEmployees]) {
      await this.employeeField.fill(candidate);

      const option = this.page.getByRole('option', { name: candidate });
      const isOptionVisible = await option
        .isVisible({ timeout: 2000 })
        .catch(() => false);

      if (isOptionVisible) {
        await option.click();
        return;
      }
    }

    throw new Error(`No claim employee autocomplete match found for ${primaryEmployee}`);
  }
}