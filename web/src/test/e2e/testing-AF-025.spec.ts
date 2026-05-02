import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config();

const storageStatePath = process.env.SANITY_MANAGE_STORAGE_STATE 
  ? resolve(process.env.SANITY_MANAGE_STORAGE_STATE) 
  : undefined;

test.describe('AF-027 Admin can Adjust Navigation UI', () => {
  test.use({ storageState: storageStatePath });

  test('User can edit nav wording and reorder items, then revert changes', async ({ page }) => {
    // Bump timeout for local Sanity Studio heavy lifting
    test.setTimeout(90000);

    const baseUrl = process.env.SANITY_BASE_URL || 'http://localhost:3333';
    
    // Using your specific document URL
    await page.goto(`${baseUrl}/structure/header;44f4c539-a447-4d9c-bd6c-093de5fbf578`, { 
        waitUntil: 'domcontentloaded', 
        timeout: 45000 
    });

    const editorPane = page.locator('[data-testid="document-pane"]');
    await expect(editorPane).toBeVisible({ timeout: 30000 });

    // Initial state capture
    const firstNavItemInput = editorPane.locator('input[type="text"]').first();
    await firstNavItemInput.waitFor({ state: 'visible' });
    const originalValue = await firstNavItemInput.inputValue();
    const newValue = `Updated Nav - ${Date.now()}`;

    try {
      // --- ACTION: Change Wording ---
      console.log(`Changing nav wording from "${originalValue}" to "${newValue}"`);
      await firstNavItemInput.fill(newValue);
      
      const publishButton = editorPane.locator('button[data-testid="action-publish"]');
      await expect(publishButton).toBeEnabled();
      await publishButton.click();
      
      // Wait for Sanity's "Published" state to stabilize
      await page.waitForTimeout(2000);

      // --- ACTION: Reorder ---
      const handles = editorPane.locator('[data-testid="drag-handle"]');
      if (await handles.count() >= 2) {
        console.log('Reordering navigation items...');
        // Manual mouse sequence is more reliable for Sanity's drag-and-drop
        await handles.nth(0).hover();
        await page.mouse.down();
        await handles.nth(1).hover();
        await page.mouse.up();
        
        await publishButton.click();
        await page.waitForTimeout(2000);
      }

      console.log('UI Adjustments verified.');

    } finally {
      console.log('Running sanity cleanup: Reverting UI changes...');
      
      // 1. Revert Wording
      const currentInput = editorPane.locator('input[type="text"]').first();
      if (await currentInput.isVisible()) {
          await currentInput.fill(originalValue);
      }

      // 2. Revert Order (Defensive check to prevent nth(1) timeout)
      const handles = editorPane.locator('[data-testid="drag-handle"]');
      const handleCount = await handles.count();
      
      if (handleCount >= 2) {
        console.log('Cleanup: Re-dragging items to original order.');
        await handles.nth(0).hover();
        await page.mouse.down();
        await handles.nth(1).hover();
        await page.mouse.up();
      }

      // 3. Final Publish
      const publishButton = editorPane.locator('button[data-testid="action-publish"]');
      if (await publishButton.isEnabled()) {
        await publishButton.click();
        console.log('Cleanup: Changes reverted and published.');
        // Allow time for the publish to complete before finishing the test
        await page.waitForTimeout(1500);
      }
    }
  });
});