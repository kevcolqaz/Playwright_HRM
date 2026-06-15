# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: claim-assign.spec.ts >> admin can see the dashboard and assign a claim
- Location: tests\claim-assign.spec.ts:4:5

# Error details

```
Error: No claim employee autocomplete match found for Test Automation
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - complementary [ref=e4]:
      - navigation "Sidepanel" [ref=e5]:
        - generic [ref=e6]:
          - link "client brand banner" [ref=e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=e9]
          - text: 
        - generic [ref=e10]:
          - generic [ref=e11]:
            - generic [ref=e12]:
              - textbox "Search" [ref=e15]
              - button "" [ref=e16] [cursor=pointer]:
                - generic [ref=e17]: 
            - separator [ref=e18]
          - list [ref=e19]:
            - listitem [ref=e20]:
              - link "Admin" [ref=e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
                - generic [ref=e24]: Admin
            - listitem [ref=e25]:
              - link "PIM" [ref=e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
                - generic [ref=e40]: PIM
            - listitem [ref=e41]:
              - link "Leave" [ref=e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
                - generic [ref=e45]: Leave
            - listitem [ref=e46]:
              - link "Time" [ref=e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
                - generic [ref=e53]: Time
            - listitem [ref=e54]:
              - link "Recruitment" [ref=e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
                - generic [ref=e61]: Recruitment
            - listitem [ref=e62]:
              - link "My Info" [ref=e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
                - generic [ref=e69]: My Info
            - listitem [ref=e70]:
              - link "Performance" [ref=e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
                - generic [ref=e79]: Performance
            - listitem [ref=e80]:
              - link "Dashboard" [ref=e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
                - generic [ref=e84]: Dashboard
            - listitem [ref=e85]:
              - link "Directory" [ref=e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
                - generic [ref=e89]: Directory
            - listitem [ref=e90]:
              - link "Maintenance" [ref=e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
                - generic [ref=e95]: Maintenance
            - listitem [ref=e96]:
              - link "Claim" [ref=e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
                - img [ref=e100]
                - generic [ref=e104]: Claim
            - listitem [ref=e105]:
              - link "Buzz" [ref=e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
                - generic [ref=e109]: Buzz
    - banner [ref=e110]:
      - generic [ref=e111]:
        - generic [ref=e112]:
          - text: 
          - heading "Claim" [level=6] [ref=e114]
        - link "Upgrade" [ref=e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=e117] [cursor=pointer]: Upgrade
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125] [cursor=pointer]:
              - img "profile picture" [ref=e126]
              - paragraph [ref=e127]: manda user
              - generic [ref=e128]: 
      - navigation "Topbar Menu" [ref=e130]:
        - list [ref=e131]:
          - listitem [ref=e132] [cursor=pointer]:
            - generic [ref=e133]:
              - text: Configuration
              - generic [ref=e134]: 
          - listitem [ref=e135] [cursor=pointer]:
            - link "Submit Claim" [ref=e136]:
              - /url: "#"
          - listitem [ref=e137] [cursor=pointer]:
            - link "My Claims" [ref=e138]:
              - /url: "#"
          - listitem [ref=e139] [cursor=pointer]:
            - link "Employee Claims" [ref=e140]:
              - /url: "#"
          - listitem [ref=e141] [cursor=pointer]:
            - link "Assign Claim" [ref=e142]:
              - /url: "#"
          - button "" [ref=e144] [cursor=pointer]:
            - generic [ref=e145]: 
  - generic [ref=e146]:
    - generic [ref=e149]:
      - heading "Create Claim Request" [level=6] [ref=e150]
      - separator [ref=e151]
      - generic [ref=e152]:
        - generic [ref=e156]:
          - generic [ref=e158]: Employee Name*
          - generic [ref=e160]:
            - textbox "Type for hints..." [active] [ref=e162]: yedghjb1 90jsnd
            - listbox [ref=e163]:
              - option "Searching...." [ref=e164] [cursor=pointer]
        - generic [ref=e166]:
          - generic [ref=e168]:
            - generic [ref=e170]: Event*
            - generic [ref=e173] [cursor=pointer]:
              - generic [ref=e174]: "-- Select --"
              - generic [ref=e176]: 
          - generic [ref=e178]:
            - generic [ref=e180]: Currency*
            - generic [ref=e183] [cursor=pointer]:
              - generic [ref=e184]: "-- Select --"
              - generic [ref=e186]: 
        - generic [ref=e190]:
          - generic [ref=e192]: Remarks
          - textbox [ref=e194]
        - separator [ref=e195]
        - generic [ref=e196]:
          - paragraph [ref=e197]: "* Required"
          - button "Cancel" [ref=e198] [cursor=pointer]
          - button "Create" [ref=e199] [cursor=pointer]
    - generic [ref=e200]:
      - paragraph [ref=e201]: OrangeHRM OS 5.8
      - paragraph [ref=e202]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e203] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1  | import { expect, type Page } from '@playwright/test';
  2  | import { Footer } from '../components/Footer';
  3  | import { Header } from '../components/Header';
  4  | import { BasePage } from './base.page';
  5  | 
  6  | export type ClaimAssignment = {
  7  |   employeeName: string;
  8  |   employeeFallbacks?: string[];
  9  |   eventName: string;
  10 |   currency: string;
  11 |   remarks: string;
  12 | };
  13 | 
  14 | export class ClaimPage extends BasePage {
  15 |   readonly header = new Header(this.page);
  16 |   readonly footer = new Footer(this.page);
  17 |   readonly employeeField = this.page.getByRole('textbox', { name: 'Type for hints...' });
  18 |   readonly createButton = this.page.getByRole('button', { name: 'Create' });
  19 |   readonly dropdownWrappers = this.page.locator('.oxd-select-wrapper');
  20 | 
  21 |   constructor(page: Page) {
  22 |     super(page);
  23 |   }
  24 | 
  25 |   async expectCreateFormVisible() {
  26 |     await this.header.expectModuleTitle('Create Claim Request');
  27 |   }
  28 | 
  29 |   async fillClaimRequest(claimAssignment: ClaimAssignment) {
  30 |     await this.selectEmployee(claimAssignment.employeeName, claimAssignment.employeeFallbacks ?? []);
  31 | 
  32 |     await this.selectDropdownOption(0, claimAssignment.eventName);
  33 |     await this.selectDropdownOption(1, claimAssignment.currency);
  34 | 
  35 |     await this.page.locator('textarea').fill(claimAssignment.remarks);
  36 |   }
  37 | 
  38 |   async createClaim() {
  39 |     await this.createButton.click();
  40 |   }
  41 | 
  42 |   async expectAssignedClaim(claimAssignment: ClaimAssignment) {
  43 |     await this.header.expectClaim();
  44 |     await expect(this.page.locator('input:not([type="checkbox"])').nth(1)).toHaveValue(claimAssignment.employeeName);
  45 |     await expect(this.page.locator('input:not([type="checkbox"])').nth(3)).toHaveValue(claimAssignment.eventName);
  46 |     await expect(this.page.locator('input:not([type="checkbox"])').nth(5)).toHaveValue(claimAssignment.currency);
  47 |     await expect(this.page.locator('textarea')).toHaveValue(claimAssignment.remarks);
  48 |     await this.footer.expectVisible();
  49 |   }
  50 | 
  51 |   private async selectDropdownOption(dropdownIndex: number, optionName: string) {
  52 |     await this.dropdownWrappers.nth(dropdownIndex).click();
  53 |     await this.page.getByRole('option', { name: optionName }).click();
  54 |   }
  55 | 
  56 |   private async selectEmployee(primaryEmployee: string, fallbackEmployees: string[]) {
  57 |     for (const candidate of [primaryEmployee, ...fallbackEmployees]) {
  58 |       await this.employeeField.fill(candidate);
  59 | 
  60 |       const option = this.page.getByRole('option', { name: candidate });
  61 |       const isOptionVisible = await option
  62 |         .isVisible({ timeout: 2000 })
  63 |         .catch(() => false);
  64 | 
  65 |       if (isOptionVisible) {
  66 |         await option.click();
  67 |         return;
  68 |       }
  69 |     }
  70 | 
> 71 |     throw new Error(`No claim employee autocomplete match found for ${primaryEmployee}`);
     |           ^ Error: No claim employee autocomplete match found for Test Automation
  72 |   }
  73 | }
```