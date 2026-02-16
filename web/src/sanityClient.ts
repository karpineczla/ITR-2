import { createClient } from '@sanity/client'

declare global {
  interface Window {
    ENV: {
      PUBLIC_SANITY_PROJECT_ID: string;
      PUBLIC_SANITY_DATASET: string;
      PUBLIC_SANITY_STUDIO_URL: string;
    };
  }
}
// Must fix process undefined error to allow env use
// const env = typeof document === "undefined" ? process.env : window.ENV;

export const client = createClient({
    projectId: 'a9qy1267',
    dataset: 'production',
    apiVersion: '2025-10-30',
    useCdn: true,
    stega: {
    studioUrl: 'http://localhost:3333', // temporary fix for testing purposes
  },
})

