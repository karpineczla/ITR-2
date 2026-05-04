import {defineType, defineField} from 'sanity'

//hero section schema
//image spanning width of screen with auto scrolling 
export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional internal title for the hero document in Studio.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alt Text',
            description: 'Describe the image for accessibility and SEO.',
          },
          {
            name: 'overlayTitle',
            type: 'string',
            title: 'Overlay Title',
            description: 'Title shown in the tan overlay on the right side of this image.',
          },
          {
            name: 'overlayText',
            type: 'text',
            title: 'Overlay Text',
            rows: 3,
            description: 'Supporting text shown under the title in the overlay.',
          },
          {
            name: 'buttonKey',
            type: 'string',
            title: 'Learn More Button Key',
            description: 'Key used to load a Learn More button document for this image.',
          },
          {
            name: 'fallbackDestination',
            type: 'string',
            title: 'Fallback Destination',
            description: 'Fallback route or URL when no Learn More button document is found.',
          },
        ]
      }],
      description: 'Images for the auto-scrolling hero slider',
      validation: Rule => Rule.min(1).error('Add at least one image'),
    }),
  ],
})
