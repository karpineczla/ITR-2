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
        })
    ]
})