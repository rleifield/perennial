import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Singleton — exactly one of these exists, at the fixed document id `studio`.
 * That is enforced in `sanity/structure.ts` and `sanity.config.ts`, not here;
 * Sanity has no `singleton: true` schema option.
 */
export const studioType = defineType({
  name: 'studio',
  title: 'Studio',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'about',
      type: 'blockContent',
      description: 'The standing description of the studio.',
    }),
    defineField({
      name: 'selectedProjects',
      title: 'Selected projects',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
      description:
        'The projects shown on the homepage, in this order. Drag to reorder. Projects left out stay reachable at their own URL and in the index.',
      validation: (rule) =>
        rule.unique().custom(async (value, context) => {
          // Sanity types the custom-rule value as unknown for arrays of
          // references, so narrow it to the reference shape we know it is.
          const refs = value as {_ref?: string}[] | undefined
          if (!refs?.length) return true

          // A project with no main image renders as nothing on the homepage,
          // which reads as a silent failure. Catch it here instead.
          const ids = refs.map((ref) => ref._ref).filter(Boolean)
          const missing: string[] = await context
            .getClient({apiVersion: '2026-06-18'})
            .fetch('*[_id in $ids && !defined(mainImage.asset)].title', {ids})

          return missing.length
            ? `Needs a main image before appearing on the homepage: ${missing.join(', ')}`
            : true
        }),
    }),
    defineField({
      name: 'clientsCollaborators',
      title: 'Clients & collaborators',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'One name per entry. Drag to set the order they read in.',
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'consultants',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'One name per entry. Drag to set the order they read in.',
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'contactBlurb',
      title: 'Contact blurb',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Studio'}),
  },
})
