import { defineQuery } from 'next-sanity'

/**
 * The studio singleton. Filtering on `_id` is the fastest possible form — the
 * document is pinned to this exact id by `sanity/structure.ts`.
 *
 * `about` and `contactBlurb` are `blockContent`, which is text and links only —
 * no image member — so neither needs an image projection.
 */
export const STUDIO_QUERY = defineQuery(/* groq */ `
  *[_id == "studio"][0]{
    about[]{
      ...,
      markDefs[]{ ..., _type == "link" => { href } }
    },
    clientsCollaborators,
    consultants,
    contactBlurb[]{
      ...,
      markDefs[]{ ..., _type == "link" => { href } }
    }
  }
`)
