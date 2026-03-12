import { defineField, defineType } from "sanity"

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroVideoUrl', type: 'url' }),
    defineField({ name: 'historyImage', type: 'image' }),
    defineField({ name: 'historyTextSide', type: 'text' }),
    defineField({ name: 'historyTextBottom', type: 'text' }),
    defineField({ name: 'missionText', type: 'text' }),
  ]
})