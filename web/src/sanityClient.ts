import { createClient } from '@sanity/client'
import { beginGlobalLoading, endGlobalLoading } from './loadingTracker'

const baseClient = createClient({
    projectId: 'a9qy1267',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
})

const sanityClient = baseClient.clone()

const originalFetch = sanityClient.fetch.bind(sanityClient)

sanityClient.fetch = ((...args: Parameters<typeof originalFetch>) => {
    beginGlobalLoading()
    return originalFetch(...args).finally(() => {
        endGlobalLoading()
    })
}) as typeof sanityClient.fetch

export const client = sanityClient
export const backgroundClient = baseClient

