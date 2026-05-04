
import { createClient } from '@sanity/client'
import { describe, expect, it } from 'vitest'

const projectId = process.env.SANITY_PROJECT_ID || 'a9qy1267'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN

const runWhenAuthenticated = token ? it : it.skip

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-01-01',
  useCdn: false,
  token,
})

type LearnMoreButtonDoc = {
  _id: string
  _type: 'learnMoreButton'
  buttonKey: string
  label: string
  destination: string
  openInNewTab: boolean
}

const query = `*[_type == "learnMoreButton" && buttonKey == $buttonKey][0]{
  _id,
  buttonKey,
  label,
  destination,
  openInNewTab
}`

describe('AF-024 learnMoreButton draft preview flow', () => {
  runWhenAuthenticated('allows creating a draft and previewing it before publish', async () => {
    const docId = `test-learn-more-${Date.now()}`
    const draftId = `drafts.${docId}`
    const buttonKey = `learn-more-preview-${Date.now()}`

    const draftPayload: LearnMoreButtonDoc = {
      _id: draftId,
      _type: 'learnMoreButton',
      buttonKey,
      label: 'Preview Learn More',
      destination: '/help',
      openInNewTab: true,
    }

    try {
      await client.createOrReplace(draftPayload)

      const publishedBeforeSubmit = await client
        .withConfig({ perspective: 'published' })
        .fetch<LearnMoreButtonDoc | null>(query, { buttonKey })

      const previewBeforeSubmit = await client
        .withConfig({ perspective: 'drafts' })
        .fetch<LearnMoreButtonDoc | null>(query, { buttonKey })

      expect(publishedBeforeSubmit).toBeNull()
      expect(previewBeforeSubmit).not.toBeNull()
      expect(previewBeforeSubmit?.label).toBe('Preview Learn More')
      expect(previewBeforeSubmit?.destination).toBe('/help')
      expect(previewBeforeSubmit?.openInNewTab).toBe(true)

      await client.createOrReplace({
        _id: docId,
        _type: 'learnMoreButton',
        buttonKey,
        label: 'Preview Learn More',
        destination: '/help',
        openInNewTab: true,
      })

      const publishedAfterSubmit = await client
        .withConfig({ perspective: 'published' })
        .fetch<LearnMoreButtonDoc | null>(query, { buttonKey })

      expect(publishedAfterSubmit).not.toBeNull()
      expect(publishedAfterSubmit?._id).toBe(docId)
      expect(publishedAfterSubmit?.buttonKey).toBe(buttonKey)
    } finally {
      await client.delete(draftId).catch(() => undefined)
      await client.delete(docId).catch(() => undefined)
    }
  }, 30000)

  it('documents required setup when skipped', () => {
    expect(projectId).toBeTruthy()
  })
})