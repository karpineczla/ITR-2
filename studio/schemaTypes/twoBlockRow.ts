import {defineType, defineField} from 'sanity'

export const twoBlockRow = defineType({
    name: 'twoBlockRow',
    title: 'Two Block Row',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
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
                            title: 'Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'text',
                            title: 'Text',
                            type: 'text',
                            rows: 4,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            text: 'text',
                        },
                        prepare({ title, text }: { title?: string; text?: string }) {
                            return {
                                title: title || 'Untitled Card',
                                subtitle: text || '',
                            }
                        },
                    },
                }
            ],
        }),
    ]
})