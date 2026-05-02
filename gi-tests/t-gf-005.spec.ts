import { test, expect } from '@playwright/test';

test('about navigation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // can get to about page?
  await page.getByRole('link', { name: 'About' }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/About/);

})

test('publications and reports navigation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // can get to about page?
  await page.getByRole('link', { name: 'Publications and Reports' }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Publications and Reports/);
})

test('interactive data navigation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // can get to interactive data page?
  await page.getByRole('link', { name: 'Interactive Data' , exact:true}).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Interactive Data/);
})

test('get involved and resources navigation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // can get to the get involved page by clicking on the link in the header bar?
  await page.getByRole('link', { name: 'Get Involved and Resources' }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Get Involved and Resources/);
  // can access events?
  await page.getByRole('button', { name: 'Events'}).click();
  await expect(page).toHaveTitle(/Events/);

  // return to last page
  await page.getByRole('link', { name: 'Get Involved and Resources' }).click();

  // can access survey kits?
  await page.getByRole('button', { name: 'Survey Kit'}).click();
  await expect(page).toHaveTitle(/Survey Kits/);

  // return to last page
  await page.getByRole('link', { name: 'Get Involved and Resources' }).click();

  // can access survey kits?
  await page.getByRole('button', { name: 'Resources see more' }).click();
  await expect(page).toHaveTitle(/Resources/);
})

test('need help navigation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // can get to about page?
  await page.getByRole('link', { name: 'Need Help?' , exact:true }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Need Help/);
})

test('employment navigation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // can get to employment page?
  await page.getByRole('link', { name: 'Employment' , exact:true }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Employment Opportunities/);
})

test('newsletter navigation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // can get to employment page?
  await page.getByRole('link', { name: 'Subscribe to Newsletter' , exact:true }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Newsletter/);
})

