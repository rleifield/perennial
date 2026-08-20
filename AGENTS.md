<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Layout invariants

The visual idea: a sticky `PERENNIAL studio,` logo, with every block of copy
aligned to it and the first line of each page reading as one sentence continuing
from it. Several values in different files conspire to produce that. They look
arbitrary in isolation, so **do not "clean up" any number below without reading
this section** — changing one alone visibly breaks alignment.

## One text column: `TextSection`

`src/components/TextSection.tsx` owns the measure and gutters for *all* copy —
pages, `Navigation`, and `ContactBlock` alike. Add new text through it rather
than hand-rolling `max-w-*`/`mx-auto` wrappers, so every left edge stays derived
from one place.

Its `logoMark` prop prepends an invisible `LogoMark`, indenting the first line so
copy begins exactly where the real sticky logo ends.

### `w-full` in `TextSection` is load-bearing

Per CSS Flexbox §8.3, **auto margins on the cross axis cancel
`align-items: stretch`**. These sections sit inside `flex flex-col` columns,
where `mx-auto` *is* the cross axis. Without a definite width the box
shrink-wraps its text and the auto margins then center *that*, so short copy
drifts inward and stops lining up with the logo. Long copy fills the measure and
hides the bug — verify with a short string, not a paragraph.

Note this only shows up at `sm` and above, since mobile uses `mx-0`.

## The one-line-height overlap

`Navigation` renders exactly one line box, so it is one line-height tall. Each
page then pulls its content up by one line-height (`-mt-5 sm:-mt-6`) so the first
line of copy shares a line with the sticky logo.

That margin must equal `body`'s `line-height` in `src/styles/globals.css`. Type
is mobile-first 17px/20px, becoming 21px/24px at `min-width: 40rem` (Tailwind's
`sm`), so the pull is 20px/24px. **Change a line-height and change the margin in
all three pages to match.** (`rem` tracks `<html>`, not `body`, so Tailwind's
spacing scale is unaffected by the `body` font-size.)

## `ContactBlock`'s height is derived, not chosen

`ContactBlock` closes every page, sized so that at the bottom of the scroll its
first line lands under the sticky logo. At rest the document's bottom edge meets
the viewport's, so the block's top sits at `100dvh - bottomPad - height`; setting

    height = 100dvh - bottomPad - stickyOffset

puts that first line exactly on the logo. Three values must therefore move
together:

| | mobile | `sm` and up |
| --- | --- | --- |
| `PageContainer` padding | `py-6` (24px) | `py-12` (48px) |
| `Navigation` sticky offset | `top-6` | `top-12` |
| `ContactBlock` height | `100dvh-48px` | `100dvh-96px` |

`dvh` rather than `vh` is deliberate: on iOS `100vh` is the height with browser
chrome *hidden*, which would misplace the line whenever the toolbar is on screen.
The tradeoff is that the block resizes slightly as that toolbar collapses.

## Checking layout changes

`npm run build` then grep the emitted CSS — it is the ground truth for whether an
arbitrary value compiled as intended:

```
grep -o '[^{}]*100dvh[^}]*}' $(find .next/static -name '*.css' | head -1)
```

This catches Tailwind silently dropping a class it could not parse. It does not
catch misalignment, so also look at a real page at both breakpoints.
