import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config();

const storageStatePath = process.env.SANITY_MANAGE_STORAGE_STATE 
  ? resolve(process.env.SANITY_MANAGE_STORAGE_STATE) 
  : undefined;

test.describe('Report Lifecycle', () => {
  test.use({ storageState: storageStatePath });

  test('User can create and then delete a new report', async ({ page }) => {
    const baseUrl = process.env.SANITY_BASE_URL || 'http://localhost:3333';
    
   
    const intentUrl = `${baseUrl}/intent/create/template=report;type=report/`;
    console.log(`Navigating to: ${intentUrl}`);
    
    await page.goto(intentUrl, { 
        waitUntil: 'domcontentloaded', 
        timeout: 45000 
    });

    const editorPane = page.locator('[data-testid="document-pane"]');
    await expect(editorPane).toBeVisible({ timeout: 30000 });

    
    const idNumber = Date.now(); 
    const titleInput = editorPane.getByLabel(/title/i);
    await titleInput.waitFor({ state: 'visible' });
    await titleInput.fill(`Automated Test ${idNumber}`);


    const publishButton = editorPane.locator('button[data-testid="action-publish"]');
    
    await expect(publishButton).toBeEnabled({ timeout: 15000 });
    await publishButton.click();
    
    console.log(`Published Report: Automated Test ${idNumber}`);

    // deleting below

  
    await editorPane.click({ position: { x: 20, y: 20 } }); 
    await page.waitForTimeout(5000); 

    console.log('Pressing Ctrl+Alt+D to delete...');
    await page.keyboard.press('Control+Alt+d');

  
    //const deleteDialog = page.getByRole('dialog');
    //const isDialogOpen = await deleteDialog.isVisible({ timeout: 3000 }).catch(() => false);

   

    const confirmButton = page.getByRole('button', { name: /delete all versions/i });
    await expect(confirmButton, 'Delete confirmation dialog did not appear').toBeVisible({ timeout: 10000 });
    await confirmButton.click();

    await expect(editorPane).not.toBeVisible({ timeout: 15000 });

    console.log('Test Passed: Report created and deleted successfully.');
  });
});