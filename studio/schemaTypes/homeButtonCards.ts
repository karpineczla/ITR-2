export const homeButtonCards = {
  name: 'homeButtonCards',
  title: 'Home Button Cards',
  type: 'document',
  fields: [
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'image',
              title: 'Card Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'link',
              title: 'Link URL (Optional)',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        }
      ]
    }
  ]
}
