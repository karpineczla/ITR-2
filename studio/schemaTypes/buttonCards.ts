import { defineField } from 'sanity'

export const buttonCards = {
  name: 'buttonCards',
  title: 'Button Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionKey',
      title: 'Section Key',
      type: 'string',
      description: 'Used by the web app to decide which card set to render on a page.',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Card Image',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternate text',
                  description: 'Important for SEO and accessibility. Describe the image content and function.',
                  validation: (Rule: any) => Rule.required(),
                },
              ],
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link URL (Optional)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      sectionKey: 'sectionKey',
    },
    prepare({ sectionKey }: { sectionKey?: string }) {
      return {
        // Use sectionKey as the Studio list title for organization only.
        title: sectionKey || 'Button Cards (missing section key)',
      }
    },
  },
}
