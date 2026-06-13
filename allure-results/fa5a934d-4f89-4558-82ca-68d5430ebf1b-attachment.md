# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: claim-assign.spec.ts >> admin can see the dashboard and assign a claim
- Location: tests\claim-assign.spec.ts:4:5

# Error details

```
Error: page.goto: net::ERR_ABORTED at https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from '../fixtures/testFixture';
  2  | import { adminCredentials, claimAssignmentData } from '../test-data/claim-data';
  3  | 
  4  | test('admin can see the dashboard and assign a claim', async ({ page, loginPage, dashboardPage, claimPage }) => {
  5  |   await test.step('Log in as admin', async () => {
  6  |     await loginPage.open();
  7  |     await loginPage.login(adminCredentials.username, adminCredentials.password);
  8  |   });
  9  | 
  10 |   await test.step('Open the authenticated dashboard', async () => {
> 11 |     await page.goto('dashboard/index');
     |                ^ Error: page.goto: net::ERR_ABORTED at https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index
  12 |     await dashboardPage.expectVisible();
  13 |   });
  14 | 
  15 |   await test.step('Open the assign claim form', async () => {
  16 |     await dashboardPage.openAssignClaim();
  17 |     await claimPage.expectCreateFormVisible();
  18 |   });
  19 | 
  20 |   await test.step('Create the claim', async () => {
  21 |     await claimPage.fillClaimRequest(claimAssignmentData);
  22 |     await claimPage.createClaim();
  23 |     await expect(page).toHaveURL(/\/claim\/assignClaim\/id\/\d+/);
  24 |     await claimPage.expectAssignedClaim(claimAssignmentData);
  25 |   });
  26 | });
```