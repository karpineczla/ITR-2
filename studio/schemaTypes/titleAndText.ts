
import {defineType, defineField} from 'sanity'

//schema for the title and text blocks (usually at the top of a page)

export const titleAndText = defineType ({
    name: 'titleAndText',
    title: 'Title and Text',
    type: 'document',
    description: 'Title and text block, left-aligned',
    fields: [
        defineField ({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField ({
            name: 'text',
            title: 'Text',
            type: 'text',
            rows: 20,
            validation: Rule => Rule.required(),
        })
    ],
});