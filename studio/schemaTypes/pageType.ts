// ./schemas/pageType.ts
import {defineArrayMember, defineField, defineType} from 'sanity'
// Page that can be displays on the site

export const pageType = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField(
      {name: 'slug',
      title:'Slug - URL Location',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        // Slugify enforces specific type of url style
        slugify: input => input
                            .toLowerCase() //lowercase
                            .replace(/\s+/g, '-') //no spaces
                            .slice(0, 200)}, //less than 200 characters
      validation: (rule) => rule
        .required()
        .error(`Required to generate a page on the website`),
}),
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