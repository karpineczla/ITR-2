import { defineField, defineType } from "sanity"

export const footer = defineType({
  name: 'footer',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'documentTitle',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Main Site Footer',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'leftFooter',
      title: 'Left Section Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'rows',
          fields:[{ name: 'row', type: 'string', title: 'Row', description: 'Row text of the left hand side of the footer. Put a space instead if you want a small break bewteen rows' },
                  { name: 'link', title: 'Link (Optional)', type: 'string', description: 'e.g., \'mailto:itrr@umontana.edu\', \'/news\', or \'https://google.com\'' }
          ],
        }
      ],
      
    }),
    defineField({
    name: 'middleLinks',
    title: 'Middle Links',
    description: '3 Links centered in the middle of the footer',
    type: 'object',
        fields: [
        { name: 'text1', title: 'Link Text 1', type: 'string' },
        { name: 'link1', title: 'Link 1', type: 'string', description: 'e.g., \'/news\' or \'https://google.com\'' },
        { name: 'text2', title: 'Link Text 2', type: 'string' },
        { name: 'link2', title: 'Link 2', type: 'string',description: 'e.g., \'/news\' or \'https://google.com\''},
        { name: 'text3', title: 'Link Text 3', type: 'string' },
        { name: 'link3', title: 'Link 3', type: 'string',description: 'e.g., \'/news\' or \'https://google.com\''},
        ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
        fields: [
        { name: 'youtube', title: 'Youtube', type: 'string'},
        { name: 'instagram', title: 'Instagram', type: 'string'},
        { name: 'linkedin', title: 'LinkedIn', type: 'string' },
        { name: 'facebook', title: 'Facebook', type: 'string'},
        ]
    
    })
  ],
})