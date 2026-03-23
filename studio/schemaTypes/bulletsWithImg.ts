import {defineType, defineField, validation} from 'sanity'

export const bulletsWithImg = defineType({
    name: 'bulletsWithImg',
    title: 'Bullets with Image',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField ({
            name: 'textTitle1',
            title: 'Text title',
            type: 'text',
        }),
        defineField ({
            name: 'text1',
            title: 'Text',
            type: 'text',
        }),
        defineField ({
            name: 'textTitle2',
            title: 'Text title',
            type: 'text',
        }),
        defineField ({
            name: 'text2',
            title: 'Text',
            type: 'text',
        }),
        defineField ({
            name: 'textTitle3',
            title: 'Text title',
            type: 'text',
        }),
        defineField ({
            name: 'text3',
            title: 'Text',
            type: 'text',
        }),
        defineField ({
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
        })
    ]
})