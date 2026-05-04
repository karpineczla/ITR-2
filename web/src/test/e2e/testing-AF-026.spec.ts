import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config();

const storageStatePath = process.env.SANITY_MANAGE_STORAGE_STATE 
  ? resolve(process.env.SANITY_MANAGE_STORAGE_STATE) 
  : undefined;

test.describe('AF-026 Admin can Unpublish Documents', () => {
  test.use({ storageState: storageStatePath });

  test('User can create and then delete a new document', async ({ page }) => {
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

  
    const publishButton = editorPane.locator('button[data-testid="action-publish"]');
    await expect(publishButton).toBeEnabled({ timeout: 15000 });
    await publishButton.click();
    console.log('Successfully created and published document.');

    // deleting of test doc starts here

    await editorPane.click({ position: { x: 10, y: 10 } }); 
    await page.waitForTimeout(500); 

    console.log('Triggering delete via keyboard shortcut...');
    await page.keyboard.press('Control+Alt+d');

    
    const deleteDialog = page.getByRole('dialog');
    const isDialogOpen = await deleteDialog.isVisible({ timeout: 3000 }).catch(() => false);

    if (!isDialogOpen) {
        console.log('Shortcut failed, falling back to manual menu click...');
        const actionMenu = page.locator('[data-testid="action-menu-button"]');
        await actionMenu.click();
        await page.getByRole('menuitem', { name: /delete/i }).click();
    }

    
    const confirmDeleteButton = page.getByRole('button', { name: /delete all versions/i });
    
    await expect(confirmDeleteButton, 'Delete confirmation button not found').toBeVisible({ timeout: 10000 });
    await confirmDeleteButton.click();

    await expect(editorPane).not.toBeVisible({ timeout: 10000 });

    console.log('Test Passed: Created and then deleted the document.');
    console.log('Test Passed: Created and then deleted the document.');
  });
});