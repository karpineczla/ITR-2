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
      description: 'Optional title or heading for the hero section (not putting one)',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        fields: [
          { name: 'alt', type: 'string', title: 'Alt Text', description: 'Describe the image for accessibility and SEO.' }
        ]
      }],
      description: 'Images for the auto-scrolling hero slider',
      validation: Rule => Rule.min(1).error('Add at least one image'),
    }),
  ],
})
