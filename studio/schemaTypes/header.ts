import { defineField, defineType } from "sanity"

export const header = defineType({
  name: 'header',
  title: 'Header Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'documentTitle',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Main Site Header',
      validation: (Rule: any) => Rule.required()
    }),
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
  of: [
    {
      type: 'object',
      name: 'announcementItem',
      fields: [
        { name: 'text', title: 'Announcement Text', type: 'string' },
        { name: 'link', title: 'Link (Optional)', type: 'string', description: 'e.g., /news or https://google.com' }
      ]
    }
  ]
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
  ],
  preview: {
    select: {
      title: 'documentTitle',
      navLinks: 'navLinks'
    },
    prepare(selection: Record<string, any>) {
      const { title, navLinks } = selection
      const count = Array.isArray(navLinks) ? navLinks.length : 0
      return {
        title: title || 'Header Settings',
        subtitle: `${count} nav link${count === 1 ? '' : 's'}`
      }
    }
  }
})