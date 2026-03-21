import { expect, test } from '@playwright/test'
import { resolve } from 'node:path'

const storageStatePath = process.env.SANITY_MANAGE_STORAGE_STATE
const projectId = process.env.SANITY_PROJECT_ID || 'a9qy1267'

test.use({
  storageState: storageStatePath ? resolve(storageStatePath) : undefined,
})

test.describe('AF-003 account add success UI message', () => {
  test('shows an on-screen success message when account add succeeds', async ({ page }) => {
    test.skip(!storageStatePath, 'Set SANITY_MANAGE_STORAGE_STATE to an authenticated Playwright storage state file.')

    // Mock a successful invite response so the test validates UI feedback without sending a real invite.
    await page.route('**/v2021-06-07/projects/*/members', async (route) => {
      if (route.request().method() !== 'POST') {
        await route.continue()
        return
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          invited: [{
            email: `playwright-success-${Date.now()}@example.com`,
            roleName: 'administrator',
          }],
        }),
      })
    })

    await page.goto('members', { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL(/\/manage\/project\/.+\/members/)

    const addMemberButton = page
      .getByRole('button', { name: /add members|invite|new member/i })
      .first()

    await expect(addMemberButton).toBeVisible()
    await addMemberButton.click()

    const inviteDialog = page.getByRole('dialog', { name: /add members/i })
    await expect(inviteDialog).toBeVisible()

    const emailInput = inviteDialog
      .getByRole('textbox', { name: /enter email address|search for a member/i })
      .first()

    await expect(emailInput).toBeVisible()
    await emailInput.fill(`playwright-success-${Date.now()}@example.com`)
    // The member input can re-render after fill; send Enter at page level to avoid stale-element timing.
    await page.keyboard.press('Enter')

    const submitButton = inviteDialog
      .getByRole('button', { name: /add members|invite|send|save/i })
      .first()

    await expect(submitButton).toBeEnabled()
    await submitButton.click()

    const successMessage = page
      .locator('[role="status"], [role="alert"], [data-ui="Toast"]')
      .filter({ hasText: /success|invited|added|invite sent|member added/i })
      .first()

    await expect(successMessage).toBeVisible()
    await expect(successMessage).toContainText(/success|invited|added|invite sent|member added/i)

    await page.unroute('**/v2021-06-07/projects/*/members')
  })

  test('documents required setup when skipped', () => {
    expect(projectId).toBeTruthy()
  })
})
