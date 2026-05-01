import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config();

const storageStatePath = process.env.SANITY_MANAGE_STORAGE_STATE 
  ? resolve(process.env.SANITY_MANAGE_STORAGE_STATE) 
  : undefined;

test.describe('AF-001 Simple Login Verification', () => {
  test.use({ storageState: storageStatePath });

  test('Passes if the user can login', async ({ page }) => {
    const baseUrl = process.env.SANITY_BASE_URL || 'http://localhost:3333';

    console.log('Navigating to Sanity Structure...');
    await page.goto(`${baseUrl}/structure`);
    await page.waitForLoadState('load');
    const currentUrl = page.url();
    console.log(`Current URL reached: ${currentUrl}`);

  
    expect(currentUrl).not.toContain('login');
    expect(currentUrl).not.toContain('auth');
    
  
    expect(currentUrl).toContain('/structure');

    console.log('Success: User was not redirected to login. Access granted.');
  });
});