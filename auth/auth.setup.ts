import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { LoginPage } from '../pages/login.page';

const storageStatePath = path.resolve(__dirname, 'storageState.json');
const authErrorScreenshotPath = path.resolve(__dirname, 'auth-setup-error.png');
const authErrorDetailsPath = path.resolve(__dirname, 'auth-setup-error.txt');

export async function ensureAuthState() {
  await fs.mkdir(path.dirname(storageStatePath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/',
  });

  try {
    page.setDefaultTimeout(30_000);
    page.setDefaultNavigationTimeout(45_000);

    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('Admin', 'admin123');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 30_000 });

    await page.context().storageState({ path: storageStatePath });
  } catch (error) {
    await page.screenshot({ path: authErrorScreenshotPath, fullPage: true }).catch(() => undefined);
    await fs.writeFile(
      authErrorDetailsPath,
      [
        'Auth setup failed before test execution.',
        `URL: ${page.url()}`,
        error instanceof Error ? `${error.name}: ${error.message}` : String(error),
        error instanceof Error ? error.stack ?? '' : '',
      ].join('\n\n'),
    );
    throw error;
  } finally {
    await browser.close();
  }
}

export { storageStatePath };
