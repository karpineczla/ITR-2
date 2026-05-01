import { expect, test } from '@playwright/test';

test.describe('Search Functionality', () => {
  test('Users can search for events on the live site', async ({ page }) => {
    const liveUrl = 'https://itrr-website-build.web.app';

    await page.goto(liveUrl, { waitUntil: 'domcontentloaded' });

    
    const searchInput = page.locator('input[type="search"]').or(page.getByPlaceholder(/search/i));
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    const searchTerm = 'Event';
    await searchInput.fill(searchTerm);
    await searchInput.press('Enter');

 
    await expect(page).toHaveURL(/.*search/i);

    
    const resultsHeading = page.getByRole('heading', { name: /search results/i });
    await expect(resultsHeading).toBeVisible({ timeout: 15000 });

    
    const queryText = page.getByText(`Showing results for "${searchTerm}"`);
    await expect(queryText).toBeVisible();


    const firstResult = page.locator('article, .event-card, li').first();
    await expect(firstResult).toBeVisible();

    console.log(`Search for "${searchTerm}" completed and results verified.`);
  });
});
