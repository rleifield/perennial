import { defineQuery } from 'next-sanity'

import { imageFragment } from './fragments'

// Matches the Studio's `defaultOrdering` in `sanity/structure.ts`, so the site
// and the editing interface list projects in the same order.
const projectOrder = /* groq */ `order(year desc, title asc)`

// `defined(slug.current)` is an optimizable filter and every project needs one
// to be routable, so it leads each filter below.
const publishedProject = /* groq */ `_type == "project" && defined(slug.current)`

/**
 * The homepage projects, curated and ordered on the studio singleton.
 *
 * Array order is the editor's order, so this one deliberately does NOT apply
 * `projectOrder`. Dereferencing yields null for a reference whose target was
 * deleted or is unpublished, so callers must drop empties.
 */
export const SELECTED_PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_id == "studio"][0].selectedProjects[]->{
    _id,
    title,
    "slug": slug.current,
    year,
    mainImage { ${imageFragment} }
  }
`)

/** Every project, title and slug only, for the /i index. */
export const PROJECT_INDEX_QUERY = defineQuery(/* groq */ `
  *[${publishedProject}] | ${projectOrder} {
    _id,
    title,
    "slug": slug.current
  }
`)

/** Slugs alone, for getStaticPaths. */
export const PROJECT_SLUGS_QUERY = defineQuery(/* groq */ `
  *[${publishedProject}].slug.current
`)

/** A single project page. */
export const PROJECT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[${publishedProject} && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    year,
    introduction,
    information[]{ _key, label, value },
    mainImage { ${imageFragment} },
    caseContent[]{
      ...,
      markDefs[]{ ..., _type == "link" => { href } },
      _type == "image" => { ${imageFragment} }
    }
  }
`)
