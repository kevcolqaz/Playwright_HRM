import { expect, test as base } from '@playwright/test';
import path from 'node:path';
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
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.project.name.includes('browserstack')) {
    await updateBrowserStackSession(page, testInfo);
  }

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

    const location = testInfo.location
      ? `${path.relative(process.cwd(), testInfo.location.file)}:${testInfo.location.line}:${testInfo.location.column}`
      : testInfo.file;

    await testInfo.attach('failure-location', {
      body: [
        `Test: ${testInfo.title}`,
        `Project: ${testInfo.project.name}`,
        `Location: ${location}`,
        `Status: ${testInfo.status}`,
        `Expected: ${testInfo.expectedStatus}`,
      ].join('\n'),
      contentType: 'text/plain',
    });
  }
});

export { expect };

async function updateBrowserStackSession(page: import('@playwright/test').Page, testInfo: import('@playwright/test').TestInfo) {
  const status = testInfo.status === testInfo.expectedStatus ? 'passed' : 'failed';
  const reason = testInfo.error?.message ?? `${testInfo.title} ${status}`;

  await page
    .evaluate(
      (_) => {},
      `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: { status, reason },
      })}`,
    )
    .catch(() => undefined);
}
