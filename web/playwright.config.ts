import { defineConfig, devices } from '@playwright/test'
import { loadEnv } from 'vite'

const env = loadEnv('test', process.cwd(), '')

Object.assign(process.env, env)

const projectId = process.env.SANITY_PROJECT_ID || 'a9qy1267'
const manageBaseUrl =
  process.env.SANITY_MANAGE_BASE_URL || `https://www.sanity.io/manage/project/${projectId}/`

export default defineConfig({
  testDir: './src/test/e2e',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  retries: 0,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: manageBaseUrl,
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
