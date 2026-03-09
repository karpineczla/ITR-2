import { defineField, defineType } from 'sanity'

export const textWithImage = defineType({
	name: 'textWithImage',
	title: 'Text with Image',
	type: 'document',
	fields: [
		defineField({
			name: 'sectionKey',
			title: 'Section Key',
			type: 'string',
			description: 'Unique key used by frontend queries (example: about-history-row).',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'rowWidth',
			title: 'Row Width',
			type: 'string',
			initialValue: '80vw',
			options: {
				list: [
					{ title: '80vw', value: '80vw' },
					{ title: '100%', value: '100%' },
				],
				layout: 'radio',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'imagePosition',
			title: 'Image Position',
			type: 'string',
			initialValue: 'left',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Right', value: 'right' },
				],
				layout: 'radio',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'textMode',
			title: 'Text Type',
			type: 'string',
			initialValue: 'paragraph',
			options: {
				list: [
					{ title: 'Paragraph', value: 'paragraph' },
					{ title: 'Bullet Points', value: 'bullets' },
				],
				layout: 'radio',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'text',
			title: 'Text',
			type: 'text',
			rows: 8,
			hidden: ({ document }) => document?.textMode === 'bullets',
			validation: (Rule) =>
				Rule.custom((value, context) => {
					if (context.document?.textMode === 'paragraph' && !value) {
						return 'Text is required when Text Type is Paragraph.'
					}
					return true
				}),
		}),
		defineField({
			name: 'bulletPoints',
			title: 'Bullet Points',
			type: 'array',
			of: [{ type: 'string' }],
			hidden: ({ document }) => document?.textMode !== 'bullets',
			validation: (Rule) =>
				Rule.custom((value, context) => {
					if (context.document?.textMode === 'bullets' && (!value || value.length === 0)) {
						return 'Add at least one bullet point when Text Type is Bullet Points.'
					}
					return true
				}),
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'altText',
			title: 'Image Alt Text',
			type: 'string',
		}),
	],
	preview: {
		select: {
			title: 'title',
			sectionKey: 'sectionKey',
			media: 'image',
			imagePosition: 'imagePosition',
			textMode: 'textMode',
		},
		prepare({ title, sectionKey, media, imagePosition, textMode }: { title?: string; sectionKey?: string; media?: any; imagePosition?: string; textMode?: string }) {
			return {
				title: title || 'Text with Image',
				subtitle: `${sectionKey || 'no-key'} • ${imagePosition || 'left'} image • ${textMode || 'paragraph'}`,
				media,
			}
		},
	},
})

