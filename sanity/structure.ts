import {CogIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

// Document types that exist exactly once. Singletons are enforced here in
// Structure (a fixed `documentId`) rather than in the schema — Sanity has no
// `singleton: true` option. Anything listed here is also filtered out of the
// generic lists below so it cannot show up twice.
const SINGLETONS = ['studio']

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Perennial')
    .items([
      S.listItem()
        .title('Studio')
        .icon(CogIcon)
        .child(
          S.document().schemaType('studio').documentId('studio').title('Studio')
        ),
      S.divider(),
      // Overriding the child (rather than building a fresh listItem) keeps the
      // id and icon Sanity derives from the schema type, which the filter at
      // the bottom of this list relies on.
      S.documentTypeListItem('project')
        .title('Projects')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([
              {field: 'year', direction: 'desc'},
              {field: 'title', direction: 'asc'},
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return id && ![...SINGLETONS, 'project'].includes(id)
      }),
    ])
