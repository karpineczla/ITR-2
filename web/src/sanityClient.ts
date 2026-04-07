import { createClient } from '@sanity/client'
import { beginGlobalLoading, endGlobalLoading } from './loadingTracker'

const sanityClient = createClient({
    projectId: 'a9qy1267',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
})

const originalFetch = sanityClient.fetch.bind(sanityClient)

sanityClient.fetch = ((...args: Parameters<typeof originalFetch>) => {
    beginGlobalLoading()
    return originalFetch(...args).finally(() => {
        endGlobalLoading()
    })
}) as typeof sanityClient.fetch

export const client = sanityClient

