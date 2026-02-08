import {defineArrayMember, defineField, defineType} from 'sanity'

export const reports= defineType({
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    // Reports' title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // Reports author(s)
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    //The pdf for the Report itself
    defineField({
      name: 'content',
      title: 'Content',
      type: 'file',
      options: {
        accept: 'application/pdf'
      },
      validation: (rule) => rule
        .required()
        .error(`Must upload a PDF document`),
    }),
    // The abstract of the report, prompts user for a summary
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      description: 'Provide a brief summary of the report.',
    }),
    // The suggested citation for the report
    defineField({
      name: 'citation',
      title: 'Citation',
      type: 'text',
      description: 'Enter the suggested citation for this report',
    }),
    // The date the report was published selected by the user
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    // A set of tags for selecting what type of report it is
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Resident', value: 'resident' },
              { title: 'Nonresident', value: 'nonresident' },
              { title: 'Population', value: 'population' },
              { title: 'Economics', value: 'economics' },
              { title: 'Outdoor Recreation', value: 'outdoorrec' },
              { title: 'Community', value: 'community' },
              { title: 'TAC', value: 'tac' },
              { title: 'Survey', value: 'survey' },
            ],
          },
        },
      ],
    }),
  ],
})
