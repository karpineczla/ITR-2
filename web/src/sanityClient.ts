import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'a9qy1267',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: true,
})

