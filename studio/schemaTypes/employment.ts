import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'employmentOpportunities',
  title: 'Employment Opportunities',
  type: 'document',
  fields: [
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'string',
      initialValue: 'WE ARE HIRING'
    }),
    defineField({
      name: 'instructionText',
      title: 'Instruction Text',
      type: 'string',
      initialValue: 'Click through the tabs to see more'
    }),
    defineField({
      name: 'jobs',
      title: 'Job Opportunities (Tabs)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'tabName', type: 'string', title: 'Tab Label (e.g., Student)' },
            { name: 'jobTitle', type: 'string', title: 'Job Title' },
            { name: 'description', type: 'text', title: 'Job Description' },
            { name: 'externalLink', type: 'url', title: 'Learn More Link' }
          ]
        }
      ]
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Description',
      type: 'array',
      of: [{ type: 'block' }] // Allows for multiple paragraphs and bold text
    })
  ]
})