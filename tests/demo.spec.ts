import { test, expect } from '../fixtures/auth-fixture';

test('Demonstrate setup and teardown using Playwright fixtures', async ({ authenticatedPage }) => {
  console.log('TEST EXECUTION: Verifying the application state...');
  
  // 1. Verify that the setup phase successfully injected the token
  const token = await authenticatedPage.evaluate(() => localStorage.getItem('authToken'));
  expect(token).toBe('fake-jwt-token-12345');

  // 2. Perform a standard assertion on the page
  const header = authenticatedPage.locator('h1');
  await expect(header).toHaveText('Example Domain');
  
  console.log('TEST EXECUTION: Completed successfully.');
});