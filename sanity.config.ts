'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/studio` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

// Types that must exist exactly once. `sanity/structure.ts` pins them to a
// fixed document id; the `document` hooks below stop a second copy being made
// any other way — via the global "create new" menu, or duplicate/delete on the
// document itself.
const SINGLETONS = ['studio']

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((template) => !SINGLETONS.includes(template.templateId)),
    actions: (prev, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? prev.filter(
            ({action}) =>
              action && !['duplicate', 'delete', 'unpublish'].includes(action)
          )
        : prev,
  },
})
