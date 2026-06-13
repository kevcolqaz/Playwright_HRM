import { expect, test } from '../fixtures/testFixture';
import { adminCredentials, claimAssignmentData } from '../test-data/claim-data';

test('admin can see the dashboard and assign a claim', async ({ page, loginPage, dashboardPage, claimPage }) => {
  await test.step('Log in as admin', async () => {
    await loginPage.open();
    await loginPage.login(adminCredentials.username, adminCredentials.password);
  });

  await test.step('Open the authenticated dashboard', async () => {
    await dashboardPage.expectVisible();
  });

  await test.step('Open the assign claim form', async () => {
    await dashboardPage.openAssignClaim();
    await claimPage.expectCreateFormVisible();
  });

  await test.step('Create the claim', async () => {
    await claimPage.fillClaimRequest(claimAssignmentData);
    await claimPage.createClaim();
    await expect(page).toHaveURL(/\/claim\/assignClaim\/id\/\d+/);
    await claimPage.expectAssignedClaim(claimAssignmentData);
  });
});