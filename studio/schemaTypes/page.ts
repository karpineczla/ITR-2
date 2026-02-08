// ./schemas/pageType.ts
import {defineArrayMember, defineField, defineType} from 'sanity'
// Page that can be displays on the site

export const pageType = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField(        {
          title: 'Content', 
          name: 'content',
          type: 'array', 
          of: [{type: 'block'}]
        }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      // Array contains what blocks can be used/placed on this page
      of: [
        defineArrayMember({
          name: 'hero',
          type: 'hero',
        }),
        defineArrayMember({
          name: 'report',
          type: 'report',
        }),
        
        defineArrayMember({
          name: 'homeButtonCards',
          type: 'homeButtonCards',
        }),/*

        defineArrayMember({
          name: 'form',
          type: 'form',
        }),
        */
        defineArrayMember({
          name: 'video',
          type: 'video',
        }),

        /*
        defineArrayMember({
          name: 'callToAction',
          type: 'reference',
          to: [{type: 'promotion'}],
        }),
        */
      ],
    }),
  ],
})