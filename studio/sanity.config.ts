import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
//import {visionTool} from '@sanity/vision'   <-- Used for GROQ queries, not needed
import {schemaTypes} from './schemaTypes/schema'
// import { defineLocations, presentationTool } from 'sanity/presentation'    <--unused

export default defineConfig({
  name: 'default',
  title: 'ITRR new website',

  projectId: 'a9qy1267',
  dataset: 'production',

  plugins: [structureTool(),
    /*
    //Presentation Tool does not work at the moment, so it has been commented out to avoid confusion
    //Needs to implement visual editing properly before it can work

    presentationTool({
    //Resolves the locations different blocks to their corresponding pages, is meant to explicitly connect them 
    // using knowledge of the site layout resource

      resolve: {
        locations: {
          homeButtonCards: defineLocations({
            select: {title: 'title'},
            resolve: () => ({
              locations: [
                { title: 'Card', href: '/'},
              ]
            })
          }),
        },
      },
  
      previewUrl: {
        initial: 'https://itrr-website-build.web.app/',

        // Requires a temporary drafting URL (does not exist)
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: ['http://localhost:*'],
    }), */
  ],
   
  schema: {
    types: schemaTypes as any,
  },
})
