import { defineField } from "sanity"

export const carousel = {
  name: 'carousel',
  title: 'Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionKey',
      title: 'Section Key',
      type: 'string',
      description: 'Unique key to target this carousel from the web app (example: interactive-data or pilot-community).',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Visitor Trends'
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
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'View report',
              description: 'Text shown on the card link button.'
            }),
            defineField({
              name: 'datetime',
              title: 'Date/Time',
              type: 'string',
              description: 'Optional to add a date and time for a session.'
            })
          ],
          preview: {
            select: {
              title: 'title'
            }
          }
        }
      ]
    }
  )],
  //what the title is in studio for the document
    preview: {
    select: {
        sectionKey: 'sectionKey',
        cards: 'cards'
    },
      prepare({sectionKey, cards}: {sectionKey?: string, cards?: {title?: string}[]}) {
        const count = cards?.length || 0
        const firstTitle = cards?.[0]?.title
      return {
          title: `Carousel${sectionKey ? ` (${sectionKey})` : ''}`,
          subtitle: count > 0 ? `${count} card${count === 1 ? '' : 's'}${firstTitle ? ` • First: ${firstTitle}` : ''}` : 'No cards yet'
      }
    },
  },
}
