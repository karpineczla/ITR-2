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
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
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