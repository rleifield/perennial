import {defineArrayMember, defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

/**
 * The single paragraph block every rich text field on the site is built from.
 *
 * Deliberately minimal: body copy and links, nothing else. The design has one
 * type style, so headings, lists, and decorators (bold/italic) are omitted
 * rather than styled away on the frontend — if an editor cannot enter it, no
 * one has to decide how to render it.
 *
 * Exported so `caseContent` can reuse the exact same block and only add images.
 * Sharing the definition by reference is the documented pattern; Sanity treats
 * these objects as immutable config.
 */
export const simplifiedBlock = defineArrayMember({
  type: 'block',
  // `normal` only — no h1-h4, no blockquote.
  styles: [{title: 'Normal', value: 'normal'}],
  lists: [],
  marks: {
    // No strong/em. Links are the only inline markup.
    decorators: [],
    annotations: [
      defineField({
        name: 'link',
        type: 'object',
        title: 'Link',
        icon: LinkIcon,
        fields: [
          defineField({
            name: 'href',
            type: 'url',
            title: 'URL',
            // `mailto` and `tel` are allowed alongside http(s) so contact copy
            // can link an email address inline.
            validation: (rule) =>
              rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel']}),
          }),
        ],
      }),
    ],
  },
})

/**
 * Text-only rich text: paragraphs and links, no images.
 *
 * Reuse on any document with `{name: 'someName', type: 'blockContent'}`.
 * For content that should also accept images, use `caseContent` instead.
 */
export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [simplifiedBlock],
})
