import {defineType, defineField} from 'sanity'

export const HomeGridCards = defineType({
  name: 'homeGridCards',
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
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'icon identifier',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              icon: 'icon',
            },
            prepare({title, subtitle, icon}) {
              return {
                title: `${icon || '📄'} ${title}`,
                subtitle: subtitle,
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
