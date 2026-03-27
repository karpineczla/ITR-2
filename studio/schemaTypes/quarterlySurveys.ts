import { defineField, defineType } from 'sanity'

export const quarterlySurveys = defineType({
  name: 'quarterlySurveys',
  title: 'Quarterly Surveys',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Quarterly Surveys',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'sectionKey',
      title: 'Section Key',
      type: 'string',
      description: 'Optional key used by the web app to query this document.',
      initialValue: 'quarterly-surveys',
    }),
    defineField({
      name: 'surveys',
      title: 'Survey Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1990).max(2100),
            }),
            defineField({
              name: 'quarter',
              title: 'Quarter',
              type: 'string',
              options: {
                list: [
                  { title: 'Q1', value: 'Q1' },
                  { title: 'Q2', value: 'Q2' },
                  { title: 'Q3', value: 'Q3' },
                  { title: 'Q4', value: 'Q4' },
                ],
                layout: 'radio',
              },
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Optional display label for this survey link.',
            }),
            defineField({
              name: 'dashboardUrl',
              title: 'Interactive Dashboard URL',
              type: 'url',
              validation: (Rule: any) => Rule.required().uri({ allowRelative: false, scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: {
              year: 'year',
              quarter: 'quarter',
              label: 'label',
            },
            prepare({ year, quarter, label }: { year?: number; quarter?: string; label?: string }) {
              return {
                title: label || `${quarter || ''} ${year || ''}`.trim() || 'Quarterly Survey',
                subtitle: year && quarter ? `${quarter} ${year}` : 'Missing year or quarter',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      surveys: 'surveys',
      sectionKey: 'sectionKey',
    },
    prepare({ title, surveys, sectionKey }: { title?: string; surveys?: unknown[]; sectionKey?: string }) {
      const count = surveys?.length || 0
      return {
        title: title || 'Quarterly Surveys',
        subtitle: `${count} survey link${count === 1 ? '' : 's'}${sectionKey ? ` • ${sectionKey}` : ''}`,
      }
    },
  },
})
