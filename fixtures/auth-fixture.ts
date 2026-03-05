import { test as base, Page } from '@playwright/test';

// 1. Define the specific Playwright type for our custom fixture
type MyFixtures = {
  authenticatedPage: Page; 
};

// 2. Extend the base test to include our custom fixture
export const test = base.extend<MyFixtures>({
  
  authenticatedPage: async ({ page }, use) => {
    // --- SETUP PHASE ---
    console.log('SETUP: Navigating to site and injecting mock authentication token...');
    await page.goto('https://example.com/');
    
    // Simulate setting up a logged-in state
    await page.evaluate(() => {
      localStorage.setItem('authToken', 'fake-jwt-token-12345');
    });

    // --- USE PHASE ---
    // The 'use' function passes the prepared page to your test.
    // The fixture pauses here while the test executes.
    await use(page);

    // --- TEARDOWN PHASE ---
    // This runs automatically after the test finishes, even if the test fails.
    console.log('TEARDOWN: Cleaning up mock authentication token to ensure isolation...');
    await page.evaluate(() => {
      localStorage.clear();
    });
  },
});

export { expect } from '@playwright/test';