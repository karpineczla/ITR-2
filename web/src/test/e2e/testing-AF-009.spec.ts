import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config();

const storageStatePath = process.env.SANITY_MANAGE_STORAGE_STATE 
  ? resolve(process.env.SANITY_MANAGE_STORAGE_STATE) 
  : undefined;

test.describe('AF-023 Logout Visibility', () => {
  test.use({ storageState: storageStatePath });

  test('Admin user can see the sign out button', async ({ page }) => {
    const baseUrl = process.env.SANITY_BASE_URL || 'http://localhost:3333';
    
    
    await page.goto(baseUrl);


    await page.waitForLoadState('domcontentloaded');

  
    const profileButton = page.locator('button').last();
    await profileButton.waitFor({ state: 'visible', timeout: 30000 });
    await profileButton.click();

    const signOutText = page.getByText(/sign out/i);

    await expect(signOutText.first()).toBeVisible({ timeout: 10000 });

    console.log('Found Sign Out text!');
  });
});