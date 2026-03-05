import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where your tests are located
  testDir: './tests',
  // Run tests in parallel to simulate fast CI/CD execution
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI to avoid resource constraints
  workers: process.env.CI ? 1 : undefined,
  // Use HTML reporter to generate the artifact for GitHub
  reporter: 'html',
  use: {
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});