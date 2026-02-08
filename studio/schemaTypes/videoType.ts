// ./schemas/videoType.ts

import {defineField, defineType} from 'sanity'

export const videoType = defineType({
  name: 'video',
  type: 'object',
  fields: [
    //Rewuires label or the video
    defineField({
      name: 'videoLabel',
      type: 'string',
    }),
    // requires a preexisting video hosted elsewhere
    defineField({
      name: 'url',
      type: 'string',
      title: 'URL',
    }),
  ],
})