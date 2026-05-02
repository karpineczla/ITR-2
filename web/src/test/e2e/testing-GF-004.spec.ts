import { expect, test } from '@playwright/test';

test.describe('GF-004 Users can download pdfs', () => {
  test('User can open the publication PDF page', async ({ page, context }) => {
   
    await page.goto('https://itrr-website-build.web.app/publications-and-reports', { 
        waitUntil: 'domcontentloaded' 
    });

    const scholarworksLink = page.getByRole('link', { name: /open scholarworks/i });
    await expect(scholarworksLink).toBeVisible();
    await scholarworksLink.click();

   
    await expect(page).toHaveURL(/.*scholarworks\.umt\.edu\/itrr_pubs.*/, { timeout: 20000 });

    const firstPdfLink = page.locator('a[href*="viewcontent.cgi"]').first();
    await expect(firstPdfLink).toBeVisible({ timeout: 15000 });

   
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), 
      firstPdfLink.click(),        
    ]);

  
    await expect(newPage).toHaveURL(/.*viewcontent\.cgi.*/, { timeout: 20000 });

    console.log('Successfully opened the PDF page. Test passed.');
  });
});