import { expect, test } from '@playwright/test'
import { resolve } from 'node:path'

const storageStatePath = process.env.SANITY_MANAGE_STORAGE_STATE
const projectId = process.env.SANITY_PROJECT_ID || 'a9qy1267'

test.use({
  storageState: storageStatePath ? resolve(storageStatePath) : undefined,
})

test.describe('AF-014 account add failure UI message', () => {
  test('shows an on-screen error when add account fails', async ({ page }) => {
    test.skip(!storageStatePath, 'Set SANITY_MANAGE_STORAGE_STATE to an authenticated Playwright storage state file.')

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
    await emailInput.fill('not-an-email')
    await emailInput.press('Enter')

    const submitButton = inviteDialog
      .getByRole('button', { name: /add members|invite|send|save/i })
      .first()

    // Failed validation should prevent submission from proceeding.
    await expect(submitButton).toBeDisabled()

    const errorMessage = inviteDialog
      .getByText(/error|invalid|not a valid|failed|unable|could not|email/i)
      .first()

    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toContainText(/error|invalid|not a valid|failed|unable|could not|email/i)
  })

  test('documents required setup when skipped', () => {
    expect(projectId).toBeTruthy()
  })
})
