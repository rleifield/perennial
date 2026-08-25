/**
 * Shared GROQ projections, interpolated into the queries in this folder.
 *
 * These are plain strings rather than `defineQuery` calls — TypeGen only reads
 * complete queries, and a fragment on its own is not one.
 */

// `asset->{_id}` is all `urlFor()` needs to build an image URL, so nothing else
// is fetched. Deliberately no `metadata.lqip`: images render at full quality
// with no placeholder or fade.
export const imageFragment = /* groq */ `
  alt,
  hotspot,
  crop,
  asset->{ _id }
`
