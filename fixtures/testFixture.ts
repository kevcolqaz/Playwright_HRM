import { expect, test as base } from '@playwright/test';
import { ClaimPage } from '../pages/claim.page';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';

type AppFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  claimPage: ClaimPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  claimPage: async ({ page }, use) => {
    await use(new ClaimPage(page));
  },
  page: async ({ page, playwright }, use, testInfo) => {
    if (testInfo.project.name.includes('browserstack')) {
      const caps = buildBrowserStackCaps(testInfo);
      const browser = await playwright.chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
      });
      const context = await browser.newContext(testInfo.project.use);
      const remotePage = await context.newPage();

      await use(remotePage);

      await remotePage.close();
      await browser.close();
      return;
    }

    await use(page);
  },
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('error-screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });

    await testInfo.attach('current-url', {
      body: page.url(),
      contentType: 'text/plain',
    });

    if (testInfo.error) {
      await testInfo.attach('failure-details', {
        body: `${testInfo.error.name}: ${testInfo.error.message}\n\n${testInfo.error.stack ?? ''}`,
        contentType: 'text/plain',
      });
    }
  }
});

export { expect };

function buildBrowserStackCaps(testInfo: { project: { name: string } ; title: string; file: string }) {
  const rawName = testInfo.project.name.replace(/@browserstack$/, '');
  const [browserPart, osPart = 'Windows 11'] = rawName.split(':');
  const [browserName = 'chrome', browserVersion = 'latest'] = browserPart.split('@');
  const [os = 'Windows', ...osVersionParts] = osPart.trim().split(/\s+/);
  const osVersion = osVersionParts.join(' ') || '11';

  return {
    browserName,
    browser_version: browserVersion,
    os,
    os_version: osVersion,
    name: `${testInfo.file} - ${testInfo.title}`,
    build: process.env.BROWSERSTACK_BUILD_NAME || 'playwright-hrm',
    project: process.env.BROWSERSTACK_PROJECT_NAME || 'Playwright HRM',
    'browserstack.username': process.env.BROWSERSTACK_USERNAME || '<USERNAME>',
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || '<ACCESS_KEY>',
    'browserstack.local': process.env.BROWSERSTACK_LOCAL || false,
  };
}