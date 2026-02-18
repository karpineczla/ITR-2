import { defineField } from "sanity"

export const recentFindingsCards = {
    name: 'recentFindingsCards',
    title: 'Recent Findings Cards',
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
                        name: 'pdf',
                        title: 'PDF File',
                        type: 'file',
                        options: {
                            accept: 'application/pdf'
                        }
                    }),
                ]
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
        title: title || 'Recent Findings Cards'
      }
    },
  },
}