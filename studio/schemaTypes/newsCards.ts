import { defineField } from "sanity"

export const newsCards = {
    name: 'newsCards',
    title: 'News Cards',
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
                        }),
                        defineField({
                            name: 'link',
                            title: 'Link URL',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title'
                        }
                    }
                }
            ]
        })
    ],
      //what the title is in studio for the document
    preview: {
    select: {
      title: 'title'
    },
    prepare({title}: {title: string}) {
      return {
        title: title || 'News Cards'
      }
    },
  },
}
