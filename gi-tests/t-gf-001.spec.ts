import { test, expect } from '@playwright/test';

test('search topics', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // can use search bar to look for outdoor recreation
  await page.getByRole('textbox').fill('Outdoor recreation');
  await page.getByRole('textbox').press('Enter');
  // Expect a title to show up related to the searched topic: outdoor recreaction
  await expect(page.getByRole('link', {name:'Tourism and Quality of Life in Montana: A Longitudinal Study of Resident Attitudes 2012-2023'})).toBeVisible();

  // can use search bar to look for stuff related to the clark fork
  await page.getByRole('textbox').fill('Clark Fork');
  await page.getByRole('textbox').press('Enter');
  // can find a related link for clark fork
  await expect(page.getByRole('link', {name:'Clark Fork River Pedal & Farm Tour 2025, Trout Creek, Montana'})).toBeVisible();
  
  // can use search bar to look for stuff related to economics
  await page.getByRole('textbox').fill('economics');
  await page.getByRole('textbox').press('Enter');
  // can find arelated link for economics
  await expect(page.getByRole('link', {name:'2024 Estimates - Nonresident Visitation, Expenditures, and Economic Contribution'})).toBeVisible();

})

test('search pages', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // can use search bar to look for EVents page
  await page.getByRole('textbox').fill('Events');
  await page.getByRole('textbox').press('Enter');
  // expect for events to be visible in search results
  await expect(page.getByRole('link', {name:'Events Upcoming and past ITRR events', exact:true})).toBeVisible();
})