import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { LoginPage } from '../pages/login.page';

const storageStatePath = path.resolve(__dirname, 'storageState.json');

export async function ensureAuthState() {
  await fs.mkdir(path.dirname(storageStatePath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('Admin', 'admin123');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.context().storageState({ path: storageStatePath });
  await browser.close();
}

export { storageStatePath };