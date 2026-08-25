import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Represents the project on the homepage and at the top of its own page.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // Not in the original field spec, but the frontend routes /project/[slug]
    // on it. Drop this only alongside a routing change.
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Used for the project URL. Generate it from the title.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'year',
      type: 'number',
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(1900)
          .max(2200)
          .error('Enter a four-digit year.'),
    }),
    defineField({
      name: 'information',
      description:
        'Label/value pairs listed beneath the project introduction, e.g. Location / Los Angeles, CA.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'informationItem',
          title: 'Item',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        }),
      ],
    }),
    defineField({
      name: 'caseContent',
      title: 'Case content',
      description: 'The ordered run of images and text making up the case study.',
      type: 'caseContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'mainImage',
    },
    prepare({title, year, media}) {
      return {title, subtitle: year ? String(year) : undefined, media}
    },
  },
})
