/// <reference types="node" />

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

describe('Reports report tag management', () => {
  //test adding tags to a report
  runWhenAuthenticated('adds tags to a report', async () => {
    const docId = `test-report-tags-${Date.now()}`
    const testTags = ['resident', 'economics', 'population']

    try {
      await client.createOrReplace({
        _id: docId,
        _type: 'report',
        title: 'Test Report with Tags',
        author: 'Test Author',
        content: 'https://example.com/report',
        abstract: 'Temporary testing abstract',
        citation: 'Temporary citation',
        date: new Date().toISOString(),
        tags: testTags,
      })

      const doc = await client.getDocument<{ tags?: string[] }>(docId)
      expect(doc?.tags).toEqual(testTags)
      expect(doc?.tags?.length).toBe(3)
    } finally {
      await client.delete(docId).catch(() => undefined)
    }
  }, 30000)

  //test updating  tags on an existing report
  runWhenAuthenticated('updates tags on an existing report', async () => {
    const docId = `test-report-update-tags-${Date.now()}`
    const initialTags = ['resident', 'community']
    const updatedTags = ['population', 'economics', 'survey']

    try {
      //create with initial tags
      await client.createOrReplace({
        _id: docId,
        _type: 'report',
        title: 'Report for Tag Update Test',
        author: 'Test Author',
        content: 'https://example.com/report',
        abstract: 'Testing tag updates',
        citation: 'Test citation',
        date: new Date().toISOString(),
        tags: initialTags,
      })

      //verify initial tags
      let doc = await client.getDocument<{ tags?: string[] }>(docId)
      expect(doc?.tags).toEqual(initialTags)

      //update tags
      await client.createOrReplace({
        _id: docId,
        _type: 'report',
        title: 'Report for Tag Update Test',
        author: 'Test Author',
        content: 'https://example.com/report',
        abstract: 'Testing tag updates',
        citation: 'Test citation',
        date: new Date().toISOString(),
        tags: updatedTags,
      })

      //verify updated tags
      doc = await client.getDocument<{ tags?: string[] }>(docId)
      expect(doc?.tags).toEqual(updatedTags)
      expect(doc?.tags?.length).toBe(3)
    } finally {
      await client.delete(docId).catch(() => undefined)
    }
  }, 30000)

  //test removing all tags from a report
  runWhenAuthenticated('removes all tags from a report', async () => {
    const docId = `test-report-remove-tags-${Date.now()}`
    const initialTags = ['resident', 'nonresident', 'tac']

    try {
      //create with tags
      await client.createOrReplace({
        _id: docId,
        _type: 'report',
        title: 'Report for Tag Removal Test',
        author: 'Test Author',
        content: 'https://example.com/report',
        abstract: 'Testing tag removal',
        citation: 'Test citation',
        date: new Date().toISOString(),
        tags: initialTags,
      })

      //verify tags exist
      let doc = await client.getDocument<{ tags?: string[] }>(docId)
      expect(doc?.tags?.length).toBe(3)

      //remove all tags
      await client.createOrReplace({
        _id: docId,
        _type: 'report',
        title: 'Report for Tag Removal Test',
        author: 'Test Author',
        content: 'https://example.com/report',
        abstract: 'Testing tag removal',
        citation: 'Test citation',
        date: new Date().toISOString(),
        tags: [],
      })

      //verify tags are removed
      doc = await client.getDocument<{ tags?: string[] }>(docId)
      expect(doc?.tags?.length).toBe(0)
    } finally {
      await client.delete(docId).catch(() => undefined)
    }
  }, 30000)

  it('documents required setup when skipped', () => {
    expect(projectId).toBeTruthy()
  })
})
