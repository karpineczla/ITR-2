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
// reads from .env file unless not existing
const env = typeof document === "undefined" ? process.env : window.ENV;

export const client = createClient({
    projectId: 'a9qy1267',
    dataset: 'production',
    apiVersion: '2025-10-30',
    useCdn: true,
    stega: {
    studioUrl: env.PUBLIC_SANITY_STUDIO_URL, 
  },
})

