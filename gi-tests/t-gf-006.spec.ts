import { test, expect } from '@playwright/test';

test('data request contact', async ({ page }) => {
  await page.goto('http://localhost:5173/help');
  // can use the data request form?
  await page.getByRole('button', { name: 'Data Request Form' }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Data Request Form/);

})

test('email contact', async ({ page }) => {
  // Tests if ITRR email is visible
  await page.goto('http://localhost:5173');
  await expect(page.getByText('itrr@umontana.edu')).toBeVisible();

})