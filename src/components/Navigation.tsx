import Link from "next/link";
import { useRouter } from "next/router";
import { LogoMark } from "@/components/LogoMark";
import { TextSection } from "@/components/TextSection";

export const Navigation = () => {
  const { pathname } = useRouter();
  const showClose = pathname === "/i" || pathname.startsWith("/project");
  // "close" returns to the homepage; keep Next from scrolling to the top so the
  // homepage can restore its saved scroll position (overlay-like dismissal).
  const link = showClose
    ? { href: "/", label: "close", scroll: false }
    : { href: "/i", label: "index", scroll: true };

  return (
    // These offsets mirror PageContainer's `py-6 sm:py-12`, so the logo pins
    // exactly where it already sits and never jumps on the first scroll.
    <div className="sticky top-6 sm:top-12 z-20 pointer-events-none">
      {/* index/close sits in the top corner: right on mobile so it clears the
          logo, left on desktop where there is room for both. */}
      <div className="absolute top-0 right-0 sm:left-0 sm:right-auto px-6 sm:px-12">
        <Link href={link.href} className="hover:underline pointer-events-auto">
          {link.label}
        </Link>
      </div>
      <TextSection>
        <LogoMark visible={true} />
      </TextSection>
    </div>
  );
};
