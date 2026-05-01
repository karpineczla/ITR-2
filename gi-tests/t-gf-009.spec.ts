import { test, expect } from '@playwright/test';

test('employment options visibile', async ({ page }) => {
  await page.goto('http://localhost:5173/employment-opportunities');
  

  // Expects a job title for student -nps.
  await expect(page.getByText('Student Opportunities - National Park Service Surveying, Temporary Work')).toBeVisible();
  // Opens and Expects a job title for students.
  await page.getByRole('button', { name: 'Student' , exact:true }).click();
  await expect(page.getByText('Student Opportunities - Part-Time/Work Study/Internship')).toBeVisible();
  // Opens and Expects a job title for the Public.
  await page.getByRole('button', { name: 'Public' , exact:true }).click();
  await expect(page.getByText('Positions Open to the Public - Montana')).toBeVisible();
  // Opens and Expects a job title for Public - NPS.
  await page.getByRole('button', { name: 'Public - NPS' }).click();
  await expect(page.getByText('Positions Open to the Public -National Park Service Surveying, Temp Work')).toBeVisible();

})