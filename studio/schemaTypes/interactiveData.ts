import { defineField } from "sanity"

export const interactiveData = {
  name: 'interactiveData',
  title: 'Interactive Data (Test)',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Links Box Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            }),
            defineField({
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            })
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'cards',
      title: 'Carousel Cards',
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
              name: 'link',
              title: 'Link URL',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            })
          ],
          preview: {
            select: {
              title: 'title'
            }
          }
        }
      ]
    }),
    defineField ({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
    defineField ({
            name: 'text',
            title: 'Text',
            type: 'text',
            rows: 20,
        })
],
  //what the title is in studio for the document
    preview: {
    select: {
        cards: 'cards'
    },
      prepare({cards}: {cards?: {title?: string}[]}) {
        const count = cards?.length || 0
        const firstTitle = cards?.[0]?.title
      return {
          title: 'Interactive Data',
          subtitle: count > 0 ? `${count} card${count === 1 ? '' : 's'}${firstTitle ? ` • First: ${firstTitle}` : ''}` : 'No cards yet'
      }
    },
  },
}
