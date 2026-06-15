import { defineConfig, devices } from '@playwright/test';

const browserStackEnabled = Boolean(
  process.env.BROWSERSTACK_USERNAME && process.env.BROWSERSTACK_ACCESS_KEY,
);
const authSetupEnabled = process.env.CREATE_AUTH_STATE === 'true';

const localProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },

  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },

  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
];

const browserStackProjects = [
  {
    name: 'chrome@latest:windows 11@browserstack',
    use: { ...devices['Desktop Chrome'] },
  },

  {
    name: 'firefox@latest:windows 11@browserstack',
    use: { ...devices['Desktop Firefox'] },
  },

  {
    name: 'safari@latest:osx Ventura@browserstack',
    use: { ...devices['Desktop Safari'] },
  },
];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  outputDir: 'artifacts/test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  globalSetup: authSetupEnabled ? require.resolve('./hooks/globalSetup') : undefined,
  globalTeardown: require.resolve('./hooks/globalTeardown'),
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['line'],
    ['html', { open: 'never', outputFolder: 'artifacts/playwright-report' }],
    ['junit', { outputFile: 'artifacts/test-results/junit-results.xml' }],
    ['allure-playwright', { detail: true, resultsDir: 'artifacts/allure-results' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  /* Configure projects for major browsers */
  projects: [
    ...localProjects,
    ...(browserStackEnabled ? browserStackProjects : []),

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
