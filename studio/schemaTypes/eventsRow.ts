import {defineType, defineField} from 'sanity'

export const eventsRow = defineType({
    name: 'eventsRow',
    title: 'Events Row',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'array',
            of: [
                {
                    type: 'block',
                    lists: [],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'URL',
                                fields: [
                                    defineField({
                                        name: 'href',
                                        title: 'URL',
                                        type: 'url',
                                        validation: Rule => Rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                                    }),
                                ],
                            },
                        ],
                    },
                },
            ],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            fields: [
                {
                name: 'alt',
                type: 'string',
                title: 'Alternate text',
                description: 'Important for SEO and accessibility. Describe the image content and function.',
                validation: (Rule: any) => Rule.required()
                }
            ]
        }),
        defineField({
            name: 'buttonKey',
            title: 'Button Key',
            type: 'string',
            description: 'Key of the buttonfor this row ',
        }),
        defineField({
            name: 'rowKey',
            title: 'Row Key',
            type: 'string',
            description: 'Unique key for selecting this event row in code, e.g. sessions.',
        })
    ]
})