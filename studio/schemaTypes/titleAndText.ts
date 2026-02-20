
import {defineType, defineField} from 'sanity'

//schema for the title and text blocks (usually at the top of a page)
//can choose left or center align for each

export const titleAndText = defineType ({
    name: 'titleAndText',
    title: 'Title and Text',
    type: 'document',
    description: 'Title, subtitle, and text block with selectable alignment',
    fields: [
        defineField ({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField ({
            name: 'titleAlignment',
            title: 'Title Alignment',
            type: 'string',
            initialValue: 'left',
            options: {
                list: [
                    {title: 'Left', value: 'left'},
                    {title: 'Center', value: 'center'},
                ],
                layout: 'radio',
            },
            validation: Rule => Rule.required(),
        }),
        defineField ({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
        }),
        defineField ({
            name: 'subtitleAlignment',
            title: 'Subtitle Alignment',
            type: 'string',
            initialValue: 'left',
            options: {
                list: [
                    {title: 'Left', value: 'left'},
                    {title: 'Center', value: 'center'},
                ],
                layout: 'radio',
            },
            validation: Rule => Rule.required(),
        }),
        defineField ({
            name: 'text',
            title: 'Text',
            type: 'text',
            rows: 20,
        }),
        defineField ({
            name: 'textAlignment',
            title: 'Text Alignment',
            type: 'string',
            initialValue: 'left',
            options: {
                list: [
                    {title: 'Left', value: 'left'},
                    {title: 'Center', value: 'center'},
                ],
                layout: 'radio',
            },
            validation: Rule => Rule.required(),
        }),
    ],
});