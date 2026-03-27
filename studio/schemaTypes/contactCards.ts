import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactCards',
  title: 'Contact Us Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Us'
    }),
    defineField({
      name: 'cards',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'role', type: 'string', title: 'Role/Subtitle' },
            { name: 'email', type: 'string', title: 'Email' },
            { name: 'phone', type: 'string', title: 'Phone Number' },
            { name: 'image', type: 'image', options: { hotspot: true }, fields: [
              { name: 'alt', type: 'string', title: 'Alt Text', description: 'Describe the image for accessibility and SEO.', validation: (Rule: any) => Rule.required() }
            ] },
            { name: 'bio', type: 'text', title: 'Biography (for expanded view)' }
          ]
        }
      ]
    })
  ]
})