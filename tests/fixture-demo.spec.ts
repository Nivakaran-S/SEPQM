import { test as base, expect } from '@playwright/test';

// 1. Define the type for our custom fixture
type MyFixtures = {
  mockDatabase: string;
};

// 2. Extend the base test to include our custom fixture
const test = base.extend<MyFixtures>({
  mockDatabase: async ({}, use) => {
    // --- SETUP PHASE ---
    console.log('▶️ [SETUP] Initializing mock database connection...');
    const dbConnection = 'db-connection-active';
    
    // --- EXECUTE TEST ---
    // The test runs exactly at this 'use' call
    await use(dbConnection); 
    
    // --- TEARDOWN PHASE ---
    console.log('⏹️ [TEARDOWN] Closing mock database connection and cleaning up...');
  },
});

// 3. Write tests that use the fixture
test('Test 1: Verify data creation uses the fixture', async ({ mockDatabase }) => {
  console.log(`   [TEST] Running Test 1 with: ${mockDatabase}`);
  expect(mockDatabase).toBe('db-connection-active');
});

test('Test 2: Verify data deletion uses the fixture', async ({ mockDatabase }) => {
  console.log(`   [TEST] Running Test 2 with: ${mockDatabase}`);
  expect(mockDatabase).toBe('db-connection-active');
});