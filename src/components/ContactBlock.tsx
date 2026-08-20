import {
  PortableTextSection,
  type SimpleBlocks,
} from '@/components/PortableTextSection'

export const ContactBlock = ({ blurb }: { blurb: SimpleBlocks }) => {
  return (
    // Sized so that, at the bottom of the scroll, this block's first line lands
    // exactly under the sticky logo. At rest the document's bottom edge meets
    // the viewport's, so this block's top sits at 100dvh - bottomPad - height;
    // setting height to 100dvh - bottomPad - stickyOffset puts it on the logo:
    //   mobile   100dvh - 24 - 24 = 100dvh - 48px
    //   sm and up 100dvh - 48 - 48 = 100dvh - 96px
    // `dvh` rather than `vh` so the math holds while mobile browser chrome is
    // on screen. Keep in step with PageContainer's padding and Navigation's top.
    <PortableTextSection
      value={blurb}
      logoMark
      className="h-[calc(100dvh-48px)] sm:h-[calc(100dvh-96px)]"
    />
  )
}
