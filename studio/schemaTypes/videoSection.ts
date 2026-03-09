import { defineField, defineType } from 'sanity'

export const videoSection = defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'document',
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
  ],
  preview: {
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Video Section',
        subtitle: 'About page video',
      }
    },
  },
})
