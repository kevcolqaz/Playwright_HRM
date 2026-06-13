import { expect, test as base, type APIRequestContext } from '@playwright/test';

type ApiFixtures = {
  api: APIRequestContext;
};

export const apiTest = base.extend<ApiFixtures>({
  api: async ({ request }, use) => {
    await use(request);
  },
});

export { expect };