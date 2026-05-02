import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config();

const storageStatePath = process.env.SANITY_MANAGE_STORAGE_STATE 
  ? resolve(process.env.SANITY_MANAGE_STORAGE_STATE) 
  : undefined;

test.describe('AF-022 testing publish functionality', () => {
  test.use({ storageState: storageStatePath });

  test('Admin can publish new entry', async ({ page }) => {
    const baseUrl = process.env.SANITY_BASE_URL || 'http://localhost:3333';
    
   
    const intentUrl = `${baseUrl}/structure/intent/create/type=test/`;
    await page.goto(intentUrl, { 
        waitUntil: 'domcontentloaded', 
        timeout: 45000 
    });

 
    const editorPane = page.locator('[data-testid="document-pane"]');
    await expect(editorPane).toBeVisible({ timeout: 30000 });


    const titleInput = editorPane.getByLabel(/title/i);
   
    await titleInput.waitFor({ state: 'visible' });
    await titleInput.fill(`Automated Test - ${Date.now()}`);

    // publish 
    const publishButton = editorPane.locator('button[data-testid="action-publish"]');
    
    await expect(publishButton).toBeEnabled({ timeout: 15000 });
    await publishButton.click();

    console.log('Published successfully.');
  });
});