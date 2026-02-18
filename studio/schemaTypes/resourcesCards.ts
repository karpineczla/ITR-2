import { defineField } from "sanity"

export default {
  name: 'resource',
  title: 'Resource',
  type: 'document',
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
          { title: 'External Link', value: 'link' }
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
      name: 'description',
      title: 'Description',
      type: 'text'
    })
  ]
}