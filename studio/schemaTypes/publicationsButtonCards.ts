//schema for the navigation cards on the homepage

import { defineField } from "sanity"

export const publicationsButtonCards = {
  name: 'publicationsButtonCards',
  title: 'Publications Button Cards',
  type: 'document',
  fields: [
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
            defineField ({
                name: 'description',
                title: 'Card Description',
                type: 'text',
                validation: (Rule: any) => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Card Image',
              type: 'image',
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
    }
  )],
  //what the title is in studio for the document
    preview: {
    select: {
      title: 'title'
    },
    prepare({title}: {title: string}) {
      return {
        title: title || 'Publications Button Cards'
      }
    },
  },
}
