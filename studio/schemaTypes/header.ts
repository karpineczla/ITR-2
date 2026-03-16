import { defineField, defineType } from "sanity"

export const header = defineType({
  name: 'header',
  title: 'Header Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text', description: 'Describe the logo for accessibility and SEO.' }
      ],
    }),
    defineField({
      name: 'announcements',
      title: 'Announcement Ticker',
      description: 'The messages that scroll at the top',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Link Text', type: 'string' },
            { name: 'href', title: 'URL Path (e.g., /about)', type: 'string' }
          ]
        }
      ]
    })
  ]
})