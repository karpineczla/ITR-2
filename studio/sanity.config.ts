import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes/schema'
import { presentationTool } from 'sanity/presentation'

export default defineConfig({
  name: 'default',
  title: 'ITRR new website',

  projectId: 'a9qy1267',
  dataset: 'production',

  plugins: [structureTool(), visionTool(),
    presentationTool({
      previewUrl: {
        initial: 'http://itrr-website-build.web.app/',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: ['http://localhost:*'],
    }),],

  schema: {
    types: schemaTypes,
  },
})
