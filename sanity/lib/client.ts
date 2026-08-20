import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Pages are generated with getStaticProps, so reads happen at build time and
  // during ISR revalidation rather than per request — go to the API directly so
  // a rebuild always sees the latest published content instead of a cached edge
  // copy.
  useCdn: false,
  // Never let draft content reach a static build.
  perspective: 'published',
})
