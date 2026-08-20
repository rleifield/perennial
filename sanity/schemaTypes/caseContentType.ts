import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

import {simplifiedBlock} from './blockContentType'

/**
 * `blockContent`'s text and links, plus images — the ordered run of copy and
 * pictures making up a project case study. The block is shared verbatim with
 * `blockContent` so the two can never drift apart.
 */
export const caseContentType = defineType({
  title: 'Case Content',
  name: 'caseContent',
  type: 'array',
  of: [
    simplifiedBlock,
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
})
