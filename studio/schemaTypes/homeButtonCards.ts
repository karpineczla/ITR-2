//schema for the navigation cards on the homepage

import { defineField } from "sanity"

export const homeButtonCards = {
  name: 'homeButtonCards',
  title: 'Home Button Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Home Button Cards',
      validation: (Rule: any) => Rule.required()
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
              validation: (Rule: any) => Rule.required()
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
                  validation: (Rule: any) => Rule.required()
                }
              ],
              options: {
                hotspot: true
              },
              validation: (Rule: any) => Rule.required()
            }),
            defineField({
              name: 'link',
              title: 'Link URL (Optional)',
              type: 'string'
            })
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      cards: 'cards'
    },
    prepare(selection: Record<string, any>) {
      const { title, cards } = selection
      const count = Array.isArray(cards) ? cards.length : 0
      return {
        title: title || 'Home Button Cards',
        subtitle: `${count} card${count === 1 ? '' : 's'}`
      }
    }
  }
}
