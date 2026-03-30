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
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule: any) => Rule.required().uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  }),
                ],
              },
            ],
          },
        },
      ],
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