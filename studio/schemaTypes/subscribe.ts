import { defineField } from "sanity"

export const subscribe = {
  name: 'subscribePage',
  title: 'Subscribe Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Subscribe Page Settings',
    }),
    defineField({
      name: 'mainImage',
      title: 'Page Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text', description: 'Describe the image for accessibility and SEO.' }
      ],
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Subscription Paragraph',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'externalLink', 
      title: 'External Subscription URL',
      type: 'url', 
      validation: (Rule: any) => Rule.required().uri({
        scheme: ['http', 'https']
      })
    }),
  ],
}