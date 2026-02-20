
import {defineType, defineField} from 'sanity'

//schema for the centered title and text blocks 

export const centeredTitleAndText = defineType ({
    name: 'centeredTitleAndText',
    title: 'Centered Title and Text',
    type: 'document',
    description: 'Title and text block, centered',
    fields: [
        defineField ({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField ({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField ({
            name: 'text',
            title: 'Text',
            type: 'text',
            rows: 20,
        })
    ],
});