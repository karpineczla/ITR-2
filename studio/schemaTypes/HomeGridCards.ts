import {defineType, defineField} from 'sanity'

export const HomeGridCards = defineType({
  name: 'HomeGridCards',
  title: 'Home Grid Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for the grid section',
    }),
    defineField({
      name: 'cards',
      title: 'Grid Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: {
            select: {
              title: 'description',
            },
            prepare({title}) {
              return {
                title: title || 'Card',
                subtitle: title,
              }
            },
          },
        },
      ],
      validation: Rule => Rule.max(4).warning('Designed for 2x2 grid (4 cards max)'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      cards: 'cards',
    },
    prepare({title, cards}) {
      return {
        title: title || 'Home Grid Cards',
        subtitle: `${cards?.length || 0} cards`,
      }
    },
  },
})
