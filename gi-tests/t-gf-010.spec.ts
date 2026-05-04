import { test, expect } from '@playwright/test';

test('student nps employment apply', async ({ page }) => {
  await page.goto('http://localhost:5173/employment-opportunities');
  

  // Expect a title "to contain" a substring.
  await expect(page.getByText('Student Opportunities - National Park Service Surveying, Temporary Work')).toBeVisible();
  await page.getByRole('link', { name: 'Learn More' }).click();
  const newTab1 = await page.waitForEvent('popup');
  await newTab1.waitForLoadState();
  await expect(newTab1).toHaveTitle(/UM Jobs/);
  

})

test('student employment apply', async ({ page }) => {
  await page.goto('http://localhost:5173/employment-opportunities');
  await page.getByRole('button', { name: 'Student', exact:true }).click();
  await expect(page.getByText('Student Opportunities - Part-Time/Work Study/Internship')).toBeVisible();
  await page.getByRole('link', { name: 'Learn More' }).click();
  const newTab2 = await page.waitForEvent('popup');
  await newTab2.waitForLoadState();
  await expect(newTab2).toHaveTitle(/UM Jobs/);
});

test('public employment apply', async ({ page }) => {
  await page.goto('http://localhost:5173/employment-opportunities');
  await page.getByRole('button', { name: 'Public' , exact:true}).click();
  await expect(page.getByText('Positions Open to the Public - Montana')).toBeVisible();
  await page.getByRole('link', { name: 'Learn More' }).click();
  const newTab3 = await page.waitForEvent('popup');
  await newTab3.waitForLoadState();
  await expect(newTab3).toHaveTitle(/UM Jobs/);
});

test('public nps employment apply', async ({ page }) => {
  await page.goto('http://localhost:5173/employment-opportunities');
  await page.getByRole('button', { name: 'Public - NPS' }).click();
  await expect(page.getByText('Positions Open to the Public -National Park Service Surveying, Temp Work')).toBeVisible();
  await page.getByRole('link', { name: 'Learn More' }).click();
  const newTab4 = await page.waitForEvent('popup');
  await newTab4.waitForLoadState();
  await expect(newTab4).toHaveTitle(/UM Jobs/);
});