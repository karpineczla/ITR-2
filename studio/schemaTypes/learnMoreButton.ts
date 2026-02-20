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
      validation: (Rule) => Rule.required(),
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
