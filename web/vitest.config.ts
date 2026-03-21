import { defineConfig, mergeConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import viteConfig from './vite.config'

const env = loadEnv('test', process.cwd(), '')

Object.assign(process.env, env)

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  }),
)
