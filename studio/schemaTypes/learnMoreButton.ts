import {defineField, defineType} from 'sanity'

export const learnMoreButton = defineType({
  name: 'learnMoreButton',
  title: 'Learn More Button',
  type: 'document',
  description: 'Reusable Learn More button destination and label',
  fields: [
    defineField({
      name: 'buttonKey',
      title: 'Button Key',
      type: 'string',
      description: 'Unique key used by the web component, e.g. resources-hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      initialValue: 'Learn More',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: 'Internal route like /about or external URL like https://example.com',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = (context.parent as { pdfFile?: unknown } | undefined) || {}
          if (parent.pdfFile) return true
          if (typeof value === 'string' && value.trim()) return true
          return 'Provide either a Destination or a PDF File.'
        }),
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = (context.parent as { destination?: string } | undefined) || {}
          if (typeof parent.destination === 'string' && parent.destination.trim()) return true
          if (value) return true
          return 'Provide either a Destination or a PDF File.'
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open In New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'buttonKey',
      subtitle: 'destination',
    },
  },
})
