import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => builder.image(source)

// Covers 1x and 2x for every size an image is displayed at: the 440px text
// column is never a limit, the 960px project box needs up to 1920, and a
// full-bleed homepage image on a wide 2x screen needs 2560.
const WIDTHS = [640, 960, 1280, 1920, 2560]

/**
 * `src`, `srcSet` and `sizes` for a plain <img>, so the browser downloads a
 * file matched to the size it actually renders at. No LQIP, no placeholder —
 * the image just appears.
 *
 * `sizes` must describe the image's CSS width at each breakpoint, otherwise the
 * browser assumes 100vw and over-downloads.
 */
export const imageProps = (
  source: SanityImageSource | null | undefined,
  sizes: string
) => {
  if (!source) return undefined

  const url = (width: number) =>
    urlFor(source).width(width).auto('format').url()

  return {
    src: url(1280),
    srcSet: WIDTHS.map((width) => `${url(width)} ${width}w`).join(', '),
    sizes,
  }
}
