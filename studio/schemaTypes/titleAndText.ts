
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
            name: 'documentTitle',
            title: 'Document Title',
            type: 'string',
            description: 'Label for this document in the list (for your reference)',
            validation: Rule => Rule.required(),
        }),
        defineField ({
            //can use a key to identify when a title isnt present
            name: 'sectionKey',
            title: 'Section Key',
            type: 'string',
            description: 'Unique key used by frontend queries (optional)',
        }),
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
            type: 'array',
            of: [
                {
                    type: 'block',
                    lists: [{ title: 'Bullet', value: 'bullet' }],
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
    preview: {
        select: {
            documentTitle: 'documentTitle',
            sectionKey: 'sectionKey',
        },
        prepare(selection: Record<string, any>) {
            const { documentTitle, sectionKey } = selection
            return {
                title: documentTitle || 'Untitled',
                subtitle: sectionKey ? `Key: ${sectionKey}` : 'No section key',
            }
        }
    }
});