import { defineField } from "sanity"

export default {
  name: 'resourceCards',
  title: 'Resources Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionKey',
      title: 'Section Key',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'cards',
      title: 'Resource Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            }),
            defineField({
              name: 'resourceType',
              title: 'Resource Type',
              type: 'string',
              options: {
                list: [
                  { title: 'PDF Download', value: 'pdf' },
                  { title: 'External Link', value: 'link' },
                  { title: 'Image', value: 'image' }
                ]
              },
              validation: (Rule: any) => Rule.required()
            }),
            defineField({
              name: 'pdfFile',
              title: 'PDF File',
              type: 'file',
              options: {
                accept: 'application/pdf'
              },
              hidden: ({ parent }: any) => parent?.resourceType !== 'pdf'
            }),
            defineField({
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              hidden: ({ parent }: any) => parent?.resourceType !== 'link'
            }),
            defineField({
              name: 'imageFile',
              title: 'Image File',
              type: 'image',
              options: {
                hotspot: true
              },
              hidden: ({ parent }: any) => parent?.resourceType !== 'image'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  lists: [],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' }
                    ],
                    annotations: [
                      {
                        name: 'link',
                        title: 'Link',
                        type: 'object',
                        fields: [
                          defineField({
                            name: 'href',
                            title: 'URL',
                            type: 'url',
                            validation: (Rule: any) => Rule.required()
                          })
                        ]
                      }
                    ]
                  }
                }
              ]
            })
          ]
        }
      ]
    })
  ]
}