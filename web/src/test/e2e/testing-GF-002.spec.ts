import { expect, test } from '@playwright/test'

const projectId = process.env.SANITY_PROJECT_ID || 'a9qy1267'

test.describe('GF-002 subscribe to newsletter', () => {
  test('button navigates to HubSpot form when clicked', async ({ page, context }) => {
    const baseUrl = process.env.SANITY_BASE_URL || 'http://localhost:5173'

    await page.goto(`${baseUrl}/subscribe`, { waitUntil: 'domcontentloaded' })

    const subscribeButton = page
      .getByRole('link', { name: /subscribe to newsletter/i })
      .first()

    await expect(subscribeButton).toBeVisible()

    const href = await subscribeButton.getAttribute('href')
    expect(href).toBe('https://rbcga.share.hsforms.com/2SV3WEgFZQv6ztDByim373Q')

    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      subscribeButton.click(),
    ])

    await expect(popup).toHaveURL(/rbcga\.share\.hsforms\.com/)
    await popup.close()
  })

  test('documents required setup when skipped', () => {
    expect(projectId).toBeTruthy()
  })
})
