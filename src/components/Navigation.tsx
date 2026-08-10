import Link from "next/link";
import { useRouter } from "next/router";
import { LogoMark } from "@/components/LogoMark";

export const Navigation = () => {
  const { pathname } = useRouter();
  const showClose = pathname === "/i" || pathname.startsWith("/project");
  // "close" returns to the homepage; keep Next from scrolling to the top so the
  // homepage can restore its saved scroll position (overlay-like dismissal).
  const link = showClose
    ? { href: "/", label: "close", scroll: false }
    : { href: "/i", label: "index", scroll: true };

  return (
    <div className="sticky top-12 z-20 pointer-events-none">
      <div className="absolute top-0 left-0">
        <Link href={link.href} className="hover:underline pointer-events-auto">
          {link.label}
        </Link>
      </div>
      <div className="max-w-[440px] mx-auto">
        <LogoMark visible={true} />
      </div>
    </div>
  );
};
