import { PortableText, type PortableTextComponents } from '@portabletext/react'

import { LogoMark } from '@/components/LogoMark'
import { ProjectImage } from '@/components/ProjectImage'
import { TextSection } from '@/components/TextSection'
import type {
  PROJECT_BY_SLUG_QUERY_RESULT,
  STUDIO_QUERY_RESULT,
} from '../../sanity.types'

// Both include `undefined` so callers can optional-chain straight off a
// possibly-missing document (`studio?.about`) without coercing to null first.

/** Text-and-links rich text (`blockContent`). */
export type SimpleBlocks =
  | NonNullable<STUDIO_QUERY_RESULT>['contactBlurb']
  | undefined
/** Text, links, and images (`caseContent`). */
export type CaseBlocks =
  | NonNullable<PROJECT_BY_SLUG_QUERY_RESULT>['caseContent']
  | undefined

const link: PortableTextComponents['marks'] = {
  link: ({ value, children }) =>
    value?.href ? (
      <a href={value.href} className="hover:underline">
        {children}
      </a>
    ) : (
      <>{children}</>
    ),
}

/**
 * One text column of rich text.
 *
 * `TextSection`'s own `logoMark` prop cannot be used here: it wraps children in
 * a <p>, and Portable Text emits a <p> per block, which would nest them. So the
 * ghost logo is prepended inside the first block instead — same rendered
 * result, same first-line indent, valid HTML.
 */
export const PortableTextSection = ({
  value,
  logoMark = false,
  className,
}: {
  value: SimpleBlocks
  logoMark?: boolean
  className?: string
}) => {
  if (!value?.length) return null

  return (
    <TextSection className={className}>
      <PortableText
        value={value}
        components={{
          marks: link,
          block: {
            normal: ({ children, index }) => (
              <p>
                {logoMark && index === 0 ? <LogoMark visible={false} /> : null}
                {children}
              </p>
            ),
          },
        }}
      />
    </TextSection>
  )
}

/**
 * A project's case study: an ordered run of text and images.
 *
 * Spacing is decided per block by what precedes it, which a container-level
 * `gap` cannot express: two paragraphs in a row read as one passage and get a
 * paragraph break, while anything meeting an image gets the full section gap.
 * Hence the plain `flex flex-col` wrapper with no gap of its own — each block
 * owns its top margin. The first block has none, because the caller's `gap-24`
 * already separates this whole run from what came before it.
 */
export const CaseContent = ({ value }: { value: CaseBlocks }) => {
  if (!value?.length) return null

  const blocks = value
  const isText = (index: number) => blocks[index]?._type === 'block'

  const spacing = (index: number) =>
    index === 0
      ? undefined
      : isText(index - 1) && isText(index)
        ? // One line-height, i.e. exactly one blank line between paragraphs.
          'mt-5 sm:mt-6'
        : 'mt-24'

  return (
    <div className="flex flex-col">
      <PortableText
        value={blocks}
        components={{
          marks: link,
          block: {
            normal: ({ children, index }) => (
              <TextSection className={spacing(index)}>
                <p>{children}</p>
              </TextSection>
            ),
          },
          types: {
            image: ({ value: image, index }) => (
              <ProjectImage
                image={image}
                alt={image?.alt ?? ''}
                className={spacing(index)}
              />
            ),
          },
        }}
      />
    </div>
  )
}
