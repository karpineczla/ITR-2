/// <reference types="node" />

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createClient } from '@sanity/client'
import { describe, expect, it } from 'vitest'

const projectId = process.env.SANITY_PROJECT_ID || 'a9qy1267'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN

//skip write tests when no token is configured, instead of failing every run.
const runWhenAuthenticated = token ? it : it.skip

//sanity client used by all tests in this file.
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-01-01',
  useCdn: false,
  token,
})

const fixtureImagePath = join(process.cwd(), 'src', 'test', 'test-img.jpg')

//helper for uploading uniquely named test assets
async function uploadTestImage(prefix: string) {
  const imageBytes = await readFile(fixtureImagePath)
  return client.assets.upload('image', imageBytes, {
    filename: `${prefix}-${Date.now()}-test-img.jpg`,
    contentType: 'image/jpeg',
  })
}

async function cleanupTestData(docId: string, assetId?: string) {
  await client.delete(docId).catch(() => undefined)

  if (assetId) {
    await client.delete(assetId).catch(() => undefined)
  }
}

describe('Image upload by schema type', () => {
  //case 1: a single required image field.
  runWhenAuthenticated('single image field: updates subscribePage.mainImage', async () => {
    const docId = 'test-subscribe-page'
    let assetId: string | undefined

    try {
      const asset = await uploadTestImage('single-image-test')
      assetId = asset._id

      await client.createOrReplace({
        _id: docId,
        _type: 'subscribePage',
        title: 'Subscribe Page Settings',
        description: 'Temporary testing description',
        externalLink: 'https://example.com',
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
          alt: 'Temporary subscribe image',
        },
      })

      const doc = await client.getDocument<{ mainImage?: { asset?: { _ref?: string } } }>(docId)
      expect(doc?.mainImage?.asset?._ref).toBe(asset._id)
    } finally {
      await cleanupTestData(docId, assetId)
    }
  }, 30000)

  //case 2: an array of images.
  runWhenAuthenticated('image array field: updates hero.images[]', async () => {
    const docId = 'test-hero'
    let assetId: string | undefined

    try {
      const asset = await uploadTestImage('image-array-test')
      assetId = asset._id

      await client.createOrReplace({
        _id: docId,
        _type: 'hero',
        title: 'Test Hero',
        images: [
          {
            _key: `hero-image-${Date.now()}`,
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
            alt: 'Temporary hero image',
          },
        ],
      })

      const doc = await client.getDocument<{ images?: Array<{ asset?: { _ref?: string } }> }>(docId)
      expect(doc?.images?.[0]?.asset?._ref).toBe(asset._id)
    } finally {
      await cleanupTestData(docId, assetId)
    }
  }, 30000)

  //case 3: image nested inside an array .
    runWhenAuthenticated('nested object image: updates buttonCards.cards[].image', async () => {
    const docId = 'test-publications-button-cards'
    let assetId: string | undefined

    try {
      const asset = await uploadTestImage('nested-image-test')
      assetId = asset._id

      await client.createOrReplace({
        _id: docId,
           _type: 'buttonCards',
        cards: [
          {
            _key: `card-${Date.now()}`,
            _type: 'object',
            title: 'Test Card',
            description: 'Temporary card for image upload testing',
            link: '/publications',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id,
              },
              alt: 'Temporary publications card image',
            },
          },
        ],
      })

      const doc = await client.getDocument<{
        cards?: Array<{ image?: { asset?: { _ref?: string } } }>
      }>(docId)
      expect(doc?.cards?.[0]?.image?.asset?._ref).toBe(asset._id)
    } finally {
      await cleanupTestData(docId, assetId)
    }
  }, 30000)
})
